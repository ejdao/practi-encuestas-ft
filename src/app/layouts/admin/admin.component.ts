import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  ElementRef,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Subscription } from 'rxjs';
import { clearLocalStorage } from '@common/services';
import { LOGIN_ROUTE, STORAGE_KEYS } from '@common/constants';
import { TsdModalService } from '@toshida/ng-components/modal';
import { maxLength, minLength, required, withOutSpaces } from '@toshida/ng-components/fields';
import { TsdToastService } from '@toshida/ng-components/toast';
import { APP_NAVIGATION } from 'src/app/app.navigation';
import { SEG_END_POINTS } from '@seguridad/end-points';
import { SessionStore } from '@stores/session';
import { Either } from '@kato-lee/utilities';

type Result = Either<string, { token: string }>;

export const encryptPass = (value: any) => {
  return value;
};

@Component({
  standalone: false,
  selector: 'app-admin-layout',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent implements OnInit {
  isDarkMode = signal(true);

  public appTitle = 'Toshida Libraries';
  public sidebarTitle = 'Developed by Ejdao';
  public sidebarSubtitle = 'Default Context';
  public tabName = 'Home';
  public accordionInCollections = true;
  public disableHiddenCollections = false;

  public navigation = APP_NAVIGATION;

  public authorities: string[] = [];
  public context = 'DEFAULT';

  private readonly _darkThemeClassName = 'dark-theme';

  public userFullNameSliced = 'BIENVENIDO';
  public userFullName = 'BIENVENIDO';

  private _subs2!: Subscription;
  passWasResetted = signal(false);
  pass = new FormControl(null!, [required, minLength(8), maxLength(20), withOutSpaces]);
  repeatPass = new FormControl(null!, [required, minLength(8), maxLength(20), withOutSpaces]);
  repeatValueWasUpdated = false;
  cadenasNoCoinciden = true;
  isLoading = false;

  constructor(
    href: ElementRef<HTMLElement>,
    private _modal: TsdModalService,
    private _session: SessionStore,
    private _cd: ChangeDetectorRef,
    private _toast: TsdToastService,
    private _http: HttpClient,
    private _router: Router,
  ) {
    href.nativeElement.classList.add('app-admin-layout');
    effect(() => {
      const savedTheme = localStorage.getItem('theme') || 'dark';
      this.isDarkMode.set(savedTheme === 'dark');
      document.documentElement.setAttribute('data-theme', savedTheme);
    });

    this._subs2 = this.repeatPass.valueChanges.subscribe((value) => {
      if (value && !this.repeatValueWasUpdated) this.repeatValueWasUpdated = true;
      if (this.repeatValueWasUpdated) {
        if (value !== this.pass.value) this.cadenasNoCoinciden = true;
        else this.cadenasNoCoinciden = false;
      }
    });
  }

  public ngOnInit(): void {
    clearLocalStorage([STORAGE_KEYS.authToken]);

    const subscription = this._session.observable().subscribe((session) => {
      const _fullName = session.user.fullName;
      this.userFullName = _fullName;
      this.userFullNameSliced = _fullName.length > 20 ? `${_fullName.slice(0, 20)}...` : _fullName;
      this.authorities = session.authorities;
      if (session.passWasResetted) this.passWasResetted.set(session.passWasResetted);
      else {
        setTimeout(() => {
          this.passWasResetted.set(session.passWasResetted);
        }, 500);
      }
      if (session.wasLoaded) {
        try {
          subscription.unsubscribe();
        } catch (error) {}
      }
    });
  }

  toggleTheme() {
    this.isDarkMode.update((v) => !v);
    const newTheme = this.isDarkMode() ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }

  public async onSend() {
    const result = await this.updatePassword(this.pass.value!);
    result.fold({
      right: (data) => {
        localStorage.setItem(STORAGE_KEYS.authToken, data.token);
        this._toast.success('Ha actualizado la contraseña correctamente');
        this._subs2.unsubscribe();
        this._session.clear();
        this._session.autoInstance();
      },
      left: (error) => {
        this._toast.danger(error);
        this.isLoading = false;
        this._cd.markForCheck();
      },
    });
  }

  public clickOnLogout(): void {
    this._modal.confirm('¿Desea cerrar su sesión?', '¿Segur@?').subscribe((success) => {
      if (success) {
        clearLocalStorage();
        this._session.clear();
        this._router.navigate([LOGIN_ROUTE]);
      }
    });
  }

  public ngOnDestroy(): void {
    document.getElementsByTagName('html')[0].classList.remove(this._darkThemeClassName);
    if (this._subs2) this._subs2.unsubscribe();
  }

  private async updatePassword(newPass: string): Promise<Result> {
    try {
      const result = await firstValueFrom(
        this._http.get<{ token: string }>(
          `${SEG_END_POINTS.V1.AUTH}/update-password/${encryptPass(newPass)}`,
          { params: { wasReset: true } },
        ),
      );
      return Either.right(result);
    } catch (error) {
      return Either.left(error);
    }
  }
}

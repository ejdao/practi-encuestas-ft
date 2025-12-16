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
import { APP_NAVIGATION } from 'src/app/app.navigation';
import { TsdModalService } from '@toshida/ng-components/modal';
import { clearLocalStorage } from '@common/services';
import { SessionStore } from '@stores/session';
import { STORAGE_KEYS } from '@common/constants';

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

  public appTitle = 'Eklipse GCM';
  public sidebarTitle = 'Grupo Clínica Médicos';
  public sidebarSubtitle = 'Alta complejidad / Medicos Centro';
  public tabName = 'Home';
  public accordionInCollections = true;
  public disableHiddenCollections = false;

  public navigation = APP_NAVIGATION;

  public authorities: string[] = [];
  public context = 'DEFAULT';

  private readonly _darkThemeClassName = 'dark-theme';

  public userFullNameSliced = 'BIENVENIDO';
  public userFullName = 'BIENVENIDO';

  public resourcesLoaded = true;

  constructor(
    href: ElementRef<HTMLElement>,
    private _modal: TsdModalService,
    private _session: SessionStore,
    private _cd: ChangeDetectorRef,
  ) {
    href.nativeElement.classList.add('app-admin-layout');
    effect(() => {
      const savedTheme = localStorage.getItem('theme') || 'dark';
      this.isDarkMode.set(savedTheme === 'dark');
      document.documentElement.setAttribute('data-theme', savedTheme);
    });
  }

  public ngOnInit(): void {
    clearLocalStorage([STORAGE_KEYS.authToken]);

    const subscription = this._session.observable().subscribe((session) => {
      const _fullName = session.user.fullName;
      this.userFullName = _fullName;
      this.userFullNameSliced = _fullName.length > 20 ? `${_fullName.slice(0, 20)}...` : _fullName;
      this.authorities = session.authorities;
      this.resourcesLoaded = true;
      this._cd.markForCheck();
    });

    subscription.unsubscribe();
  }

  toggleTheme() {
    this.isDarkMode.update((v) => !v);
    const newTheme = this.isDarkMode() ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }

  public clickOnLogout(): void {
    this._modal.confirm('¿Desea cerrar su sesión?', '¿Segur@?').subscribe((success) => {
      if (success) {
        clearLocalStorage();
        location.reload();
      }
    });
  }

  public ngOnDestroy(): void {
    document.getElementsByTagName('html')[0].classList.remove(this._darkThemeClassName);
  }
}

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
import { APP_NAVIGATION_TAK } from 'src/app/app.navigation';
/* import { STORAGE_KEYS, clearLocalStorage } from '@common/application/services'; */
/* import { GcmContextType } from '@common/domain/types';
import { SessionStore } from '@stores/session';
import { CentrosStore } from '@stores/centros'; */
/* import {
  IS_WEB_DISPLAYED_ON_MOBILE,
  webIsDisplayedOnMobile,
  updateVersionClasses,
} from '@common/application/services'; */

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

  public navigation = APP_NAVIGATION_TAK;

  public authorities: string[] = [];
  public context = 'DEFAULT';

  private readonly _darkThemeClassName = 'dark-theme';

  public userFullNameSliced = 'BIENVENIDO';
  public userFullName = 'BIENVENIDO';

  public resourcesLoaded = true;

  constructor(
    href: ElementRef<HTMLElement>,
    /*     private _modal: TsdModalService,
    private _session: SessionStore,
    private _centros: CentrosStore, */
    private _cd: ChangeDetectorRef,
  ) {
    href.nativeElement.classList.add('gcm-admin-layout');
    effect(() => {
      const savedTheme = localStorage.getItem('theme') || 'dark';
      this.isDarkMode.set(savedTheme === 'dark');
      document.documentElement.setAttribute('data-theme', savedTheme);
    });
  }

  public ngOnInit(): void {
    this._setInitialTheme();
    this._loadInitialResources();

    //clearLocalStorage([STORAGE_KEYS.authToken]);
  }

  toggleTheme() {
    this.isDarkMode.update((v) => !v);
    const newTheme = this.isDarkMode() ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }

  public clickOnLogout(): void {
    /*  this._modal.confirm('¿Desea cerrar su sesión?', '¿Segur@?').subscribe(success => {
      if (success) {
        clearLocalStorage();
        location.reload();
      }
    }); */
  }

  private _setInitialTheme(): void {
    /*  const isDarkModeActived = window.matchMedia('(prefers-color-scheme: dark)');

    if (
      localStorage.getItem(STORAGE_KEYS.isDarkTheme) === 'true' ||
      (isDarkModeActived.matches && localStorage.getItem(STORAGE_KEYS.isDarkTheme) !== 'false')
    ) {
      document.getElementsByTagName('html')[0].classList.add(this._darkThemeClassName);
    } */
  }

  private async _loadInitialResources(): Promise<void> {
    /*  await this._session.autoInstance();
    await this._centros.autoInstance();

    const subscription = this._session.observable().subscribe(session => {
      if (session.wasLoaded) {
        const _fullName = session.user.fullName;
        this.userFullName = _fullName;
        this.userFullNameSliced =
          _fullName.length > 20 ? `${_fullName.slice(0, 20)}...` : _fullName;
        this.context = session.context;
        this.sidebarSubtitle = session.context.getForHumans();
        this.authorities = session.authorities;
        this.resourcesLoaded = true;
        this._cd.markForCheck();
      }
    });

    subscription.unsubscribe(); */
  }

  public ngOnDestroy(): void {
    document.getElementsByTagName('html')[0].classList.remove(this._darkThemeClassName);
  }

  public async clickOnChangeVersion(version: 'mobile' | 'web'): Promise<void> {
    /* if (version === 'web') {
      this._modal
        .confirm(
          '¿Está segur@ que desea ir a la versión de escritorio?',
          'Cambiar a versión de escritorio'
        )
        .subscribe(result => {
          if (result) {
            localStorage.setItem(STORAGE_KEYS.forceWebVersion, 'true');
            localStorage.removeItem(STORAGE_KEYS.forceMobileVersion);
            updateVersionClasses(version);
            location.reload();
          }
        });
    } else {
      this._modal
        .confirm('¿Está segur@ que desea ir a la versión movil?', 'Cambiar a versión movil')
        .subscribe(result => {
          if (result) {
            localStorage.removeItem(STORAGE_KEYS.forceWebVersion);
            if (window.matchMedia(`(max-width:640px)`).matches && !IS_WEB_DISPLAYED_ON_MOBILE) {
              localStorage.setItem(STORAGE_KEYS.forceMobileVersion, 'true');
            }
            updateVersionClasses(version);
            location.reload();
          }
        });
    } */
  }

  get isMobile() {
    return /* webIsDisplayedOnMobile(); */ false;
  }

  get wasOpenedOnMobile() {
    return /* IS_WEB_DISPLAYED_ON_MOBILE || window.matchMedia(`(max-width:640px)`).matches; */ false;
  }
}

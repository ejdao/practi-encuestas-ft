import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AccessControlComponent } from '@toshida/ng-components/layouts/access-control';
import { TsdSelectFieldComponent, TsdTextFieldComponent } from '@toshida/ng-components/fields';
import { TsdToastService } from '@toshida/ng-components/toast';
import { MatCheckboxModule } from '@toshida/material/checkbox';
import { MatButtonModule } from '@toshida/material/button';
import { FetchContextsController, LoginController } from '@seguridad/auth/presentation/controllers';
import { FetchContextsService, LoginService } from '@seguridad/auth/application/services';
import { FetchContextsImpl, LoginImpl } from '@seguridad/auth/infrastructure/services';
import { STORAGE_KEYS } from '@common/constants';
import { SessionStore } from '@stores/session';
import { CtmType } from '@common/types';
import { LoginForm } from './form';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    TsdTextFieldComponent,
    TsdSelectFieldComponent,
    MatCheckboxModule,
    MatButtonModule,
    AccessControlComponent,
  ],
  providers: [
    SessionStore,
    LoginController,
    FetchContextsController,
    { provide: LoginService, useClass: LoginImpl },
    { provide: FetchContextsService, useClass: FetchContextsImpl },
  ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm = new LoginForm();
  isAuthenticating = false;
  contexts = signal<CtmType<string>[]>(null!);

  constructor(
    href: ElementRef<HTMLElement>,
    private _fetchContexts: FetchContextsController,
    private _toast: TsdToastService,
    private _auth: LoginController,
    private _session: SessionStore,
    private _cd: ChangeDetectorRef,
    private _router: Router,
  ) {
    href.nativeElement.classList.add('app-login');
  }
  async ngOnInit(): Promise<void> {
    const result = await this._fetchContexts.execute();
    result.fold({
      right: (contexts) => {
        this.contexts.set(contexts);
        this._cd;
      },
      left: (error) => {
        this._toast.danger(error);
      },
    });
  }

  public async clickOnAuthenticate() {
    if (this.loginForm.valid) {
      this.isAuthenticating = true;
      this._cd.markForCheck();

      const result = await this._auth.execute(this.loginForm.model);

      let authSuccess = false;

      result.fold({
        right: (response) => {
          authSuccess = true;
          localStorage.setItem(STORAGE_KEYS.authToken, response.token!);
        },
        left: (error) => {
          this._toast.danger(error);
        },
      });

      if (authSuccess) {
        await this._session.autoInstance();
        this._router.navigate(['']);
      }

      this.isAuthenticating = false;
      this._cd.markForCheck();
    }
  }
}

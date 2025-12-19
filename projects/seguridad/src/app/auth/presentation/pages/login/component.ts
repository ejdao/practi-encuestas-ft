import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AccessControlComponent } from '@toshida/ng-components/layouts/access-control';
import { TsdTextFieldComponent } from '@toshida/ng-components/fields';
import { TsdToastService } from '@toshida/ng-components/toast';
import { MatCheckboxModule } from '@toshida/material/checkbox';
import { MatButtonModule } from '@toshida/material/button';
import { LoginController } from '@seguridad/auth/presentation/controllers';
import { LoginService } from '@seguridad/auth/application/services';
import { LoginImpl } from '@seguridad/auth/infrastructure/services';
import { STORAGE_KEYS } from '@common/constants';
import { SessionStore } from '@stores/session';
import { LoginForm } from './form';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    TsdTextFieldComponent,
    MatCheckboxModule,
    MatButtonModule,
    AccessControlComponent,
  ],
  providers: [{ provide: LoginService, useClass: LoginImpl }, LoginController, SessionStore],
  templateUrl: './component.html',
  styleUrl: './component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm = new LoginForm();
  isAuthenticating = false;

  constructor(
    _href: ElementRef<HTMLElement>,
    private _auth: LoginController,
    private _session: SessionStore,
    private _cd: ChangeDetectorRef,
    private _toast: TsdToastService,
    private _router: Router,
  ) {
    _href.nativeElement.classList.add('app-login');
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

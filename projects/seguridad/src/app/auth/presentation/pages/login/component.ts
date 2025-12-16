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
  providers: [{ provide: LoginService, useClass: LoginImpl }, LoginController, TsdToastService],
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

      result.fold({
        right: (response) => {
          localStorage.setItem(STORAGE_KEYS.authToken, response.token!);
          this._router.navigate(['']);
        },
        left: (error) => {
          this._toast.danger(error);
        },
      });

      this.isAuthenticating = false;
      this._cd.markForCheck();
    }
  }
}

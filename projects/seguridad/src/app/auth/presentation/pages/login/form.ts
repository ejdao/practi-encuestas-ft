import { FormControl, FormGroup } from '@angular/forms';
import { LoginPayload } from '@seguridad/auth/application/payloads';
import { required } from '@toshida/ng-components/fields';

export class LoginForm extends FormGroup {
  constructor() {
    super({
      username: new FormControl('1234', [required]),
      password: new FormControl('12345678', [required]),
      rememberMe: new FormControl(true, [required]),
    });
  }

  get username(): FormControl<string> {
    return this.get('username') as FormControl;
  }

  get password(): FormControl<string> {
    return this.get('password') as FormControl;
  }

  get rememberMe(): FormControl<boolean> {
    return this.get('rememberMe') as FormControl;
  }

  public get model(): LoginPayload {
    return {
      username: this.username.value,
      password: this.password.value,
      rememberMe: this.rememberMe.value,
    };
  }
}

import { FormControl, FormGroup } from '@angular/forms';
import { EntidadBasicaI } from '@common/models';
import { CreateUsuarioPayload } from '@seguridad/usuarios/application/payloads';
import {
  ESTADO_USUARIO,
  EstadoUsuarioType,
  estadoUsuarioTypeFactory,
  TIPOS_DOCUMENTO,
} from '@seguridad/usuarios/domain/types';
import { UsuarioToEditRes } from '@seguridad/usuarios/infrastructure/responses';
import { maxLength, onlyNumber, required } from '@toshida/ng-components/fields';

export class ManageUsuarioForm extends FormGroup {
  constructor() {
    super({
      id: new FormControl(null!),
      rol: new FormControl(null!, [required]),
      estado: new FormControl(ESTADO_USUARIO.ACTIVO, [required]),
      documento: new FormControl(null, [required, maxLength(15), onlyNumber]),
      primerNombre: new FormControl(null, [required, maxLength(100)]),
      segundoNombre: new FormControl(null, [maxLength(100)]),
      primerApellido: new FormControl(null, [required, maxLength(100)]),
      segundoApellido: new FormControl(null, [maxLength(100)]),
      numeroCelular: new FormControl(null, [onlyNumber, maxLength(10)]),
      email: new FormControl(null, [maxLength(50)]),
    });
  }

  get id(): FormControl<string> {
    return this.get('id') as FormControl;
  }

  get rol(): FormControl<EntidadBasicaI> {
    return this.get('rol') as FormControl;
  }

  get estado(): FormControl<EstadoUsuarioType> {
    return this.get('estado') as FormControl;
  }

  get documento(): FormControl<string> {
    return this.get('documento') as FormControl;
  }

  get primerNombre(): FormControl<string> {
    return this.get('primerNombre') as FormControl;
  }
  get segundoNombre(): FormControl<string | null> {
    return this.get('segundoNombre') as FormControl;
  }

  get primerApellido(): FormControl<string> {
    return this.get('primerApellido') as FormControl;
  }

  get segundoApellido(): FormControl<string | null> {
    return this.get('segundoApellido') as FormControl;
  }

  get numeroCelular(): FormControl<string | null> {
    return this.get('numeroCelular') as FormControl;
  }

  get email(): FormControl<string | null> {
    return this.get('email') as FormControl;
  }

  public getModel(): CreateUsuarioPayload {
    const response: CreateUsuarioPayload = {
      id: this.id.value,
      rolId: this.rol.value.id as any as string,
      rol: this.rol.value,
      tipoDocumentoCode: TIPOS_DOCUMENTO.CEDULA_CIUDADANIA.getCode(),
      estado: this.estado.value,
      estadoCode: this.estado.value.getCode(),
      documento: this.documento.value,
      primerNombre: this.primerNombre.value,
      segundoNombre: this.segundoNombre.value,
      primerApellido: this.primerApellido.value,
      segundoApellido: this.segundoApellido.value,
      numeroCelular: this.numeroCelular.value,
      email: this.email.value,
    };

    return response;
  }

  public onReset() {
    this.id.reset();
    this.rol.reset();
    this.estado.setValue(ESTADO_USUARIO.ACTIVO);
    this.documento.reset();
    this.primerNombre.reset();
    this.segundoNombre.reset();
    this.primerApellido.reset();
    this.segundoApellido.reset();
    this.numeroCelular.reset();
    this.email.reset();
  }

  public setValues(data: UsuarioToEditRes) {
    this.onReset();
    if (data) {
      this.id.setValue(data.id);
      this.rol.setValue(data.rol);
      this.estado.setValue(estadoUsuarioTypeFactory(data.estado.code));
      this.documento.setValue(data.documento);
      this.primerNombre.setValue(data.primerNombre);
      this.segundoNombre.setValue(data.segundoNombre!);
      this.primerApellido.setValue(data.primerApellido);
      this.segundoApellido.setValue(data.segundoApellido);
      this.numeroCelular.setValue(data.numeroContactoPrincipal);
      this.email.setValue(data.email);
    }
  }
}

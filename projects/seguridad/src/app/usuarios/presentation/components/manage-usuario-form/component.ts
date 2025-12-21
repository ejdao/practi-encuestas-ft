import {
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ChangeDetectorRef,
  EventEmitter,
  OnDestroy,
  Component,
  ViewChild,
  OnInit,
  Output,
  Input,
} from '@angular/core';
import { TsdRemoteAutoCompleteFieldComponent } from '@toshida/ng-components/fields';
import { TsdFieldsModule } from '@toshida/ng-components/fields';
import { TsdToastService } from '@toshida/ng-components/toast';
import { TsdModalService } from '@toshida/ng-components/modal';
import { MatDividerModule } from '@toshida/material/divider';
import { MatButtonModule } from '@toshida/material/button';
import { MatIconModule } from '@toshida/material/icon';
import { UsuarioCrudProxy } from '@seguridad/usuarios/infrastructure/repositories';
import { CreateUsuarioPayload } from '@seguridad/usuarios/application/payloads';
import { UsuarioCrudRepository } from '@seguridad/usuarios/domain/repositories';
import { UsuarioToEditRes } from '@seguridad/usuarios/infrastructure/responses';
import { ESTADO_USUARIO_VALUES } from '@seguridad/usuarios/domain/types';
import { Usuario } from '@seguridad/usuarios/domain/entities';
import { SEG_END_POINTS } from '@seguridad/end-points';
import { UsuarioCrudController } from '../../controllers';
import { ManageUsuarioForm } from './form';

@Component({
  imports: [TsdFieldsModule, MatButtonModule, MatDividerModule, MatIconModule],
  providers: [
    { provide: UsuarioCrudRepository, useClass: UsuarioCrudProxy },
    UsuarioCrudController,
  ],
  selector: 'app-manage-usuario-form',
  templateUrl: './component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ManageUsuarioFormComponent implements OnInit, OnDestroy {
  @Input() usuario!: Usuario;
  @Output() onBack = new EventEmitter();
  @Output() onUpdate = new EventEmitter<CreateUsuarioPayload>();

  @ViewChild('userToEditField') userToEditField!: TsdRemoteAutoCompleteFieldComponent;
  @ViewChild('rolField') rolField!: TsdRemoteAutoCompleteFieldComponent;
  userToEditUrl = SEG_END_POINTS.V1.USUARIOS;
  selectRoleUrl = SEG_END_POINTS.V1.ROLES;
  form = new ManageUsuarioForm();
  isNewUsuario = true;

  private _interval: any;

  constructor(
    private _ctrl: UsuarioCrudController,
    private _toast: TsdToastService,
    private _modal: TsdModalService,
    private _cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    if (this.usuario) {
      this.isNewUsuario = false;
      this._interval = setInterval(() => {
        if (this.userToEditField) {
          this.userToEditField.updateValue(this.usuario.documento, true);
          this.userToEditField.disable();
          clearInterval(this._interval);
        }
      }, 500);
    }
  }

  onSelectDocumento(event: UsuarioToEditRes) {
    this.form.setValues(event);
    if (!event) {
      this.rolField.reset();
      this.isNewUsuario = true;
    } else {
      this.rolField.updateValue(event.rol);
      this.form.rol.setValue(event.rol);
      this.isNewUsuario = false;
    }
  }

  async onSave() {
    const model = this.form.getModel();
    const result = await this._ctrl.save(model);

    result.fold({
      right: () => {
        this._toast.success(`Usuario ${this.isNewUsuario ? 'creado' : 'modificado'} correctamente`);
        const newDocumento = this.form.documento.value;
        this.rolField.reset();
        this.form.onReset();
        this.userToEditField.updateValue(newDocumento, true);
        this._cd.markForCheck();
      },
      left: (error) => {
        this._toast.danger(error);
      },
    });

    if (this.usuario) this.onUpdate.emit(model);
  }

  async onResetPass() {
    this._modal
      .confirm('¿Desea restaurar la contraseña de este usuario?', '¿Segur@?')
      .subscribe(async (success) => {
        if (success) {
          const result = await this._ctrl.resetPassword(this.form.id.value);

          result.fold({
            right: () => {
              this._toast.success('La contraseña del usuario fue restaurada correctamente');
            },
            left: (error) => {
              this._toast.danger(error);
            },
          });
        }
      });
  }

  ngOnDestroy(): void {
    if (this._interval) clearInterval(this._interval);
  }

  get estadosUsuarioSuggestions() {
    return ESTADO_USUARIO_VALUES;
  }
}

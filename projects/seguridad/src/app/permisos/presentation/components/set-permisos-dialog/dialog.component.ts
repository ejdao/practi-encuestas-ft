import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@toshida/material/dialog';
import { TsdFieldsModule } from '@toshida/ng-components/fields';
import { TsdToastService } from '@toshida/ng-components/toast';
import { MatCheckboxModule } from '@toshida/material/checkbox';
import { MatTableDataSource } from '@toshida/material/table';
import { MatDividerModule } from '@toshida/material/divider';
import { MatToolbarModule } from '@toshida/material/toolbar';
import { MatButtonModule } from '@toshida/material/button';
import { MatRadioModule } from '@toshida/material/radio';
import { MatIconModule } from '@toshida/material/icon';
import {
  PermisoProxyRepository,
  RolProxyRepository,
} from '@seguridad/permisos/infrastructure/repositories';
import {
  PermisoRolApplication,
  PermisoUsuarioApplication,
} from '@seguridad/permisos/infrastructure/services';
import { PermisoRolService, PermisoUsuarioService } from '@seguridad/permisos/application/services';
import { ROLES_DEPENDIENTES_VALUES, RolDependienteType } from '@seguridad/permisos/domain/types';
import { PermisoRepository, RolRepository } from '@seguridad/permisos/domain/repositories';
import { Permiso, Rol, Usuario } from '@seguridad/permisos/domain/entities';
import { cloneDeep } from '@kato-lee/utilities';
import {
  PermisoCrudController,
  PermisoRolController,
  PermisoUsuarioController,
} from '../../controllers';

@Component({
  imports: [
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatRadioModule,
    TsdFieldsModule,
    MatButtonModule,
    MatDividerModule,
  ],
  providers: [
    { provide: PermisoUsuarioService, useClass: PermisoUsuarioApplication },
    { provide: PermisoRepository, useClass: PermisoProxyRepository },
    { provide: PermisoRolService, useClass: PermisoRolApplication },
    { provide: RolRepository, useClass: RolProxyRepository },
    PermisoUsuarioController,
    PermisoCrudController,
    PermisoRolController,
  ],
  selector: 'app-set-permisos-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SetPermisosDialog implements OnInit, OnDestroy {
  public dataSource = new MatTableDataSource<Permiso>([]);

  public filter = new FormControl('');

  private _subscription: Subscription;

  constructor(
    href: ElementRef<HTMLElement>,
    public dialogRef: MatDialogRef<SetPermisosDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: { data: Usuario | Rol; tipoEntidad: 'usuario' | 'rol' },
    private _permisoUsuario: PermisoUsuarioController,
    private _permisoRol: PermisoRolController,
    private _permisosCrud: PermisoCrudController,
    private _toast: TsdToastService,
  ) {
    href.nativeElement.classList.add('app-set-permisos-dialog');
    this._subscription = this.filter.valueChanges.subscribe((value) => {
      this.dataSource.filter = value!.trim().toLowerCase();
    });
  }

  public async ngOnInit(): Promise<void> {
    const result = await this._permisosCrud.fetch();

    result.fold({
      right: (permisos) => {
        const _permisos = cloneDeep(permisos);

        _permisos.map((permiso) => {
          const permisoUsuario = this.data.data.permisos.filter(
            (el) => el.codigo === permiso.codigo,
          );
          if (permisoUsuario.length) {
            permiso.isByRol = permisoUsuario[0].isByRol;
            permiso.isActive = true;
            permiso.rolDependienteCode = permisoUsuario[0].rolDependienteCode;
          } else {
            permiso.isActive = false;
          }
        });

        this.dataSource = new MatTableDataSource<Permiso>(_permisos);
      },
      left: () => {
        this._toast.danger('No se obtuvieron los permisos correctamente');
      },
    });
  }

  async onTogglePermiso(permiso: Permiso, isChecked: boolean) {
    let result;

    const transaction = isChecked ? 'agregado' : 'retirado';

    if (this.data.tipoEntidad === 'usuario') {
      if (isChecked)
        result = await this._permisoUsuario.addPermiso(permiso, this.data.data as Usuario);
      else result = await this._permisoUsuario.removePermiso(permiso, this.data.data as Usuario);
    } else {
      if (isChecked) result = await this._permisoRol.add(permiso, this.data.data as Rol);
      else result = await this._permisoRol.remove(permiso, this.data.data as Rol);
    }

    result.fold({
      right: (success) => {
        if (success) {
          permiso.isActive = isChecked;
        } else {
          this._toast.danger(`El permiso no fue ${transaction} correctamente`);
        }
      },
      left: () => {
        this._toast.danger(`El permiso no fue ${transaction} correctamente`);
      },
    });
  }

  async onToggleRolDependiente(permiso: Permiso, isChecked: boolean, rol: RolDependienteType) {
    permiso.setRolDependiente(rol.getCode());
    if (isChecked) await this.onTogglePermiso(permiso, isChecked);
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public onClose(): void {
    const permisos = this.dataSource.data.filter((el) => el.isActive && el.tipo.code === 3);

    this.dialogRef.close({
      data: this.data.data,
      permisos,
    });
  }

  get rolesDependientes() {
    return ROLES_DEPENDIENTES_VALUES;
  }
}

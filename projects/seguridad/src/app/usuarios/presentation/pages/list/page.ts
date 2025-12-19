import {
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ViewChild,
  Component,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TsdTextFieldComponent } from '@toshida/ng-components/fields';
import { TsdTablesModule } from '@toshida/ng-components/tables';
import { TsdToastService } from '@toshida/ng-components/toast';
import { TsdModalService } from '@toshida/ng-components/modal';
import { MatTableDataSource } from '@toshida/material/table';
import { MatButtonModule } from '@toshida/material/button';
import { MatPaginator } from '@toshida/material/paginator';
import { MatIconModule } from '@toshida/material/icon';
import { MatSort } from '@toshida/material/sort';
import { SessionStore } from '@stores/session';
import { UsuarioCrudProxy } from '@seguridad/usuarios/infrastructure/repositories';
import { UsuarioCrudRepository } from '@seguridad/usuarios/domain/repositories';
import { Usuario } from '@seguridad/usuarios/domain/entities';
import { ManageUsuarioFormComponent } from '../../components/manage-usuario-form';
import { UsuarioCrudController } from '../../controllers';

@Component({
  imports: [
    TsdTablesModule,
    TsdTextFieldComponent,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    ManageUsuarioFormComponent,
  ],
  providers: [
    { provide: UsuarioCrudRepository, useClass: UsuarioCrudProxy },
    UsuarioCrudController,
  ],
  selector: 'app-usuarios-list-web',
  templateUrl: './page.html',
  styleUrl: './page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Page implements OnInit {
  showTable = true;
  usuarioSelected!: Usuario;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | any;
  @ViewChild(MatSort, { static: true }) sort: MatSort | any;
  expandedElement: any;
  dataSource = new MatTableDataSource<Usuario>([]);
  filter = '';
  isLoading = false;
  displayedColumns = ['nombreCompleto', 'nombreRol', 'acciones'];

  private _myDocument!: string;
  private _wasUpdated = false;

  constructor(
    private _ctrl: UsuarioCrudController,
    private _toast: TsdToastService,
    private _modal: TsdModalService,
    private _session: SessionStore,
  ) {}

  ngOnInit(): void {
    const subs = this._session.observable().subscribe((session) => {
      if (session.wasLoaded) {
        this._myDocument = session.user.document;
      }
    });
    subs.unsubscribe();

    this.onGetData(false);

    this._subscribeToUsuariosDataChanges();
  }

  onBackToTable() {
    this.showTable = true;
    if (this._wasUpdated) this.onRefresh();
  }

  onUpdateUser(usuario: Usuario) {
    this._wasUpdated = false;
    this.showTable = false;
    this.usuarioSelected = usuario;
  }

  async onResetPass(id: string) {
    this._modal
      .confirm('¿Desea restaurar la contraseña de este usuario?', '¿Segur@?')
      .subscribe(async (success) => {
        if (success) {
          const result = await this._ctrl.resetPassword(id);

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

  onUserUpdated() {
    this._wasUpdated = true;
  }

  async onGetData(refresh: boolean) {
    this.isLoading = true;
    this._instanceTable([]);
    this.filter = '';

    this.isLoading = true;
    const result = await this._ctrl.fetch(refresh);
    this.isLoading = false;
  }

  public async onRefresh(): Promise<void> {
    this.onGetData(true);
  }

  private _subscribeToUsuariosDataChanges(): void {
    this._ctrl.observable().subscribe((el) => {
      this._instanceTable(el.data.filter((d) => d.documento !== this._myDocument));
    });
  }

  private _instanceTable(usuarios: Usuario[]): void {
    this.dataSource = new MatTableDataSource<Usuario>(usuarios);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}

import {
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ViewChild,
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
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
import { Subject, takeUntil } from 'rxjs';

@Component({
  imports: [
    FormsModule,
    MatIconModule,
    MatButtonModule,
    TsdTablesModule,
    TsdTextFieldComponent,
    ManageUsuarioFormComponent,
  ],
  providers: [
    UsuarioCrudController,
    { provide: UsuarioCrudRepository, useClass: UsuarioCrudProxy },
  ],
  selector: 'app-usuarios-list-web',
  templateUrl: './page.html',
  styleUrl: './page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Page implements OnInit, OnDestroy {
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
  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _ctrl: UsuarioCrudController,
    private _toast: TsdToastService,
    private _modal: TsdModalService,
    private _session: SessionStore,
    private _cd: ChangeDetectorRef,
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
    await this._ctrl.fetch(refresh);
  }

  public async onRefresh(): Promise<void> {
    this.onGetData(true);
  }

  private _subscribeToUsuariosDataChanges(): void {
    this._ctrl
      .observable()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((el) => {
        this._instanceTable(el.data.filter((d) => d.documento !== this._myDocument));
        this.isLoading = false;
        this._cd.markForCheck();
      });
  }

  private _instanceTable(usuarios: Usuario[]): void {
    this.dataSource = new MatTableDataSource<Usuario>(usuarios);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}

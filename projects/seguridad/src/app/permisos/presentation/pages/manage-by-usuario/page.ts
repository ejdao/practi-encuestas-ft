import {
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ChangeDetectorRef,
  ElementRef,
  ViewChild,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { TsdTextFieldComponent } from '@toshida/ng-components/fields';
import { TsdTablesModule } from '@toshida/ng-components/tables';
import { TsdToastService } from '@toshida/ng-components/toast';
import { MatTableDataSource } from '@toshida/material/table';
import { MatPaginator } from '@toshida/material/paginator';
import { MatButtonModule } from '@toshida/material/button';
import { MatIconModule } from '@toshida/material/icon';
import { MatSort } from '@toshida/material/sort';
import { UsuarioProxyRepository } from '@seguridad/permisos/infrastructure/repositories';
import { UsuarioRepository } from '@seguridad/permisos/domain/repositories';
import { Permiso, Usuario } from '@seguridad/permisos/domain/entities';
import { SetPermisosDialogService } from '../../components';
import { UsuarioCrudController } from '../../controllers';

@Component({
  imports: [
    TsdTablesModule,
    TsdTextFieldComponent,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [
    UsuarioCrudController,
    SetPermisosDialogService,
    { provide: UsuarioRepository, useClass: UsuarioProxyRepository },
  ],
  selector: 'app-manage-permiso-by-usuario-web',
  templateUrl: './page.html',
  styleUrls: ['./page.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Page implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | any;
  @ViewChild(MatSort, { static: true }) sort: MatSort | any;

  public expandedElement: any;
  public dataSource = new MatTableDataSource<Usuario>([]);
  public filter = new FormControl('');

  private _unsubscribe$ = new Subject<void>();
  private _displayedColumns = ['nombreCompleto', 'nombreRol'];
  private _isLoading = false;

  constructor(
    href: ElementRef<HTMLElement>,
    private _setPermisosDialog: SetPermisosDialogService,
    private _usuariosCrud: UsuarioCrudController,
    private _toast: TsdToastService,
    private _cd: ChangeDetectorRef,
  ) {
    href.nativeElement.classList.add('app-manage-permiso-by-usuario-web');
  }

  public async ngOnInit(): Promise<void> {
    this.filter.valueChanges.pipe(takeUntil(this._unsubscribe$)).subscribe((value) => {
      this.dataSource.filter = value!.trim().toLowerCase();
    });

    this.fetch(false);

    this._subscribeToUsuariosDataChanges();
  }

  private _subscribeToUsuariosDataChanges(): void {
    this._usuariosCrud
      .observable()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((el) => {
        this._instanceTable(el.data);
      });
  }

  public async fetch(refresh = false): Promise<void> {
    this._isLoading = true;
    this._cd.markForCheck();

    await this._usuariosCrud.fetch(refresh);

    this._isLoading = false;
    this._cd.markForCheck();
  }

  public onRefresh(): void {
    this._instanceTable([]);
    this.filter.setValue('', { emitEvent: false });
    this.fetch(true);
  }

  private _instanceTable(usuarios: Usuario[]): void {
    this.dataSource = new MatTableDataSource<Usuario>(usuarios);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public async onSelectUsuario(usuario: Usuario) {
    const permisos = await this._usuariosCrud.fetchPermisos(usuario.id);

    permisos.fold({
      right: (permisos) => {
        usuario.permisos = permisos;

        const dialog = this._setPermisosDialog.open(usuario, 'usuario');

        dialog.afterClosed().subscribe((data: { data: Usuario; permisos: Permiso[] }) => {
          this.dataSource.data.filter((d) => d.id === data.data.id)[0].permisos = data.permisos;

          this._cd.markForCheck();
        });
      },
      left: (message) => {
        this._toast.danger(message);
      },
    });
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  get displayedColumns(): string[] {
    return this._displayedColumns;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }
}

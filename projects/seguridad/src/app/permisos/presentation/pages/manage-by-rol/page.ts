import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
  ElementRef,
  OnDestroy,
  ViewChild,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { TsdTextFieldComponent } from '@toshida/ng-components/fields';
import { TsdTablesModule } from '@toshida/ng-components/tables';
import { MatTableDataSource } from '@toshida/material/table';
import { MatButtonModule } from '@toshida/material/button';
import { MatPaginator } from '@toshida/material/paginator';
import { MatIconModule } from '@toshida/material/icon';
import { MatSort } from '@toshida/material/sort';
import { RolProxyRepository } from '@seguridad/permisos/infrastructure/repositories';
import { RolRepository } from '@seguridad/permisos/domain/repositories';
import { Permiso, Rol } from '@seguridad/permisos/domain/entities';
import { SetPermisosDialogService } from '../../components';
import { RolCrudController } from '../../controllers';

@Component({
  imports: [
    TsdTablesModule,
    TsdTextFieldComponent,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [
    RolCrudController,
    SetPermisosDialogService,
    { provide: RolRepository, useClass: RolProxyRepository },
  ],
  selector: 'app-manage-permiso-by-rol-web',
  templateUrl: './page.html',
  styleUrls: ['./page.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Page implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | any;
  @ViewChild(MatSort, { static: true }) sort: MatSort | any;

  public expandedElement: any;
  public dataSource = new MatTableDataSource<Rol>([]);
  public filter = new FormControl('');

  private _unsubscribe$ = new Subject<void>();
  private _displayedColumns = ['nombre', 'cantidadPermisos'];
  private _isLoading = false;

  constructor(
    href: ElementRef<HTMLElement>,
    private _setPermisosDialog: SetPermisosDialogService,
    private _rolesCrud: RolCrudController,
    private _cd: ChangeDetectorRef,
  ) {
    href.nativeElement.classList.add('app-manage-permiso-by-rol-web');
  }

  public ngOnInit(): void {
    this.filter.valueChanges
      .pipe(takeUntil(this._unsubscribe$), distinctUntilChanged())
      .subscribe((value) => {
        this.dataSource.filter = value!.trim().toLowerCase();
      });

    this.fetch(false);

    this._subscribeToRolesDataChanges();
  }

  private _subscribeToRolesDataChanges(): void {
    this._rolesCrud
      .observable()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((roles) => {
        this._instanceTable(roles.data);
        this._cd.markForCheck();
      });
  }

  public onRefresh(): void {
    this.filter.setValue('');
    this.fetch(true);
  }

  public async fetch(refresh = false): Promise<void> {
    this._isLoading = true;
    this._cd.markForCheck();

    this.paginator.pageIndex = 0;
    await this._rolesCrud.fetch(refresh);

    this._isLoading = false;
    this._cd.markForCheck();
  }

  private _instanceTable(roles: Rol[]): void {
    this.dataSource = new MatTableDataSource<Rol>(roles);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public onSelectRol(rol: Rol) {
    const dialog = this._setPermisosDialog.open(rol, 'rol');

    dialog.afterClosed().subscribe((data: { data: Rol; permisos: Permiso[] }) => {
      this.dataSource.data.filter((el) => el.id === data.data.id)[0].permisos = data.permisos;

      this._cd.markForCheck();
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

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateAuthoritiesServices } from './service';
import { TsdAutocompleteFieldComponent } from '@toshida/ng-components/fields';
import { TsdToastService } from '@toshida/ng-components/toast';
import { TsdModalService } from '@toshida/ng-components/modal';
import {
  TsdRemoteAutocompleteFieldComponent,
  TsdTextFieldComponent,
} from '@toshida/ng-components/fields';
import { SEG_END_POINTS } from '@seguridad/end-points';
import { MatTabsModule } from '@toshida/material/tabs';
import { MatButtonModule } from '@toshida/material/button';

@Component({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TsdTextFieldComponent,
    TsdRemoteAutocompleteFieldComponent,
    TsdAutocompleteFieldComponent,
    MatButtonModule,
    MatTabsModule,
  ],
  providers: [CreateAuthoritiesServices],
  selector: 'app-create-authorities-web',
  templateUrl: './page.html',
  styleUrls: ['./page.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Page {
  public modulo: any = { nombre: '' };
  public subModulo: any = { nombre: '', modulo: null };
  public permiso: any = { nombre: '', modulo: null, subModulo: null };

  public remoteUrlModules = SEG_END_POINTS.V1.MODULOS;

  constructor(
    href: ElementRef<HTMLElement>,
    private _createAuthoritiesServices: CreateAuthoritiesServices,
    private _cd: ChangeDetectorRef,
    private _toast: TsdToastService,
    private _modal: TsdModalService,
  ) {
    href.nativeElement.classList.add('app-create-authorities-web');
  }

  async clicOnCreateModule() {
    this._modal
      .confirm('Seguro desea registrar este modulo', 'Segur@?')
      .subscribe(async (success) => {
        if (success) {
          try {
            await this._createAuthoritiesServices.createModule(this.modulo.nombre);
            this._toast.success('Modulo registrado correctamente');
            this.modulo.nombre = '';
            this._cd.markForCheck();
          } catch (error: any) {
            this._toast.danger(error.error.message);
          }
        }
      });
  }

  async clicOnCreateSubModule() {
    this._modal
      .confirm('Seguro desea registrar este submodulo', 'Segur@?')
      .subscribe(async (success) => {
        if (success) {
          try {
            await this._createAuthoritiesServices.createSubModule(
              this.subModulo.nombre,
              (this.subModulo.modulo as any).id,
            );
            this._toast.success('Submodulo registrado correctamente');
            this.subModulo.nombre = '';
            this._cd.markForCheck();
          } catch (error: any) {
            this._toast.danger(error.error.message);
          }
        }
      });
  }

  async clicOnCreateAuthority() {
    this._modal
      .confirm('Seguro desea registrar este permiso', 'Segur@?')
      .subscribe(async (success) => {
        if (success) {
          try {
            await this._createAuthoritiesServices.createAuthority(
              this.permiso.nombre,
              this.permiso.modulo ? (this.permiso.modulo as any).id : undefined,
              this.permiso.subModulo ? (this.permiso.subModulo as any).id : undefined,
            );
            this._toast.success('Permiso registrado correctamente');
            this.permiso.nombre = '';
            this._cd.markForCheck();
          } catch (error: any) {
            this._toast.danger(error.error.message);
          }
        }
      });
  }
}

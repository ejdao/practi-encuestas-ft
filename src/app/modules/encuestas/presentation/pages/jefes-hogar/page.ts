import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
  ElementRef,
  Component,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {
  IonSearchbar,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonLabel,
  IonItem,
  IonIcon,
} from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { EncuestasImpl, FormatoImpl } from '@encuestas/infrastructure/services';
import { EncuestadoCrudSource } from '@encuestas/infrastructure/repositories';
import { RespuestaEncuestaPayload } from '@encuestas/application/payloads';
import { PreguntaComponent } from '@encuestas/presentation/components';
import { ObservableUpdated } from '@encuestas/application/observables';
import { PARENTEZCOS, TIPOS_PREGUNTA } from '@encuestas/domain/types';
import { ENCUESTAS_KEY_IDS } from '@encuestas/application/constants';
import { Encuesta, Encuestado } from '@encuestas/domain/entities';
import {
  EncuestaController,
  EncuestadoCrudController,
  FormatoController,
} from '@encuestas/presentation/controllers';
import { TsdModalService } from '@toshida/ng-components/modal';
import { TsdToastService } from '@toshida/ng-components/toast';
import { MatTableDataSource } from '@toshida/material/table';
import { UsuarioCardModule } from './usuario-card';

@Component({
  imports: [
    PreguntaComponent,
    UsuarioCardModule,
    IonSearchbar,
    FormsModule,
    IonToolbar,
    IonButtons,
    IonButton,
    IonTitle,
    IonLabel,
    IonItem,
    IonIcon,
  ],
  providers: [
    EncuestadoCrudController,
    EncuestadoCrudSource,
    EncuestaController,
    FormatoController,
    ObservableUpdated,
    EncuestasImpl,
    FormatoImpl,
  ],
  selector: 'app-jefes-hogar-web',
  templateUrl: './page.html',
  styleUrl: './page.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Page implements OnInit, OnDestroy {
  public dataSource = new MatTableDataSource<Encuestado>([]);
  public filter = '';
  public encuesta!: Encuesta;

  public showAddVivienda = false;
  public showAddFamiliar = false;
  public destroyComponent = false;
  public isLoading = signal(false);

  private _lastUpdate: Date | null = null;
  private _subscription!: Subscription;
  private _encuestadoSelected!: Encuestado;
  private _preguntaSeleccionadaIndex = 0;
  private _encuestaKeyId!: number;

  constructor(
    href: ElementRef<HTMLElement>,
    private _cd: ChangeDetectorRef,
    private _crudCtrl: EncuestadoCrudController,
    private _encuestasCtrl: EncuestaController,
    private _formatosCtrl: FormatoController,
    private _observable: ObservableUpdated,
    private _toast: TsdToastService,
    private _modal: TsdModalService,
  ) {
    href.nativeElement.classList.add('app-jefes-hogar-web');
  }

  public async ngOnInit(): Promise<void> {
    await this.fetch();

    this._crudCtrl.observable().subscribe((stored) => {
      this._instanceDataSource(stored.data);
      this._lastUpdate = stored.updatedAt;
    });
  }

  public async fetch(refresh = false) {
    this.isLoading.set(true);

    const result = await this._crudCtrl.fetch(
      { parentezco: PARENTEZCOS.JEFE_HOGAR, onlyCreatedByMe: true, forComplement: true },
      refresh,
    );

    result.fold({
      left: (error) => {
        this._toast.danger(error);
      },
    });

    this.isLoading.set(false);
  }

  updateObservable() {
    this._observable.update();
  }

  public async fetchEncuesta(formatoId: number) {
    const result = await this._formatosCtrl.generar(formatoId);
    result.fold({
      right: (data) => {
        this.encuesta = data;
      },
      left: (error) => {
        this._toast.danger(error);
      },
    });
    this._cd.markForCheck();
  }

  public updateQuestion(action: 'next' | 'previous') {
    this.destroyComponent = true;

    const payload: RespuestaEncuestaPayload[] = [];
    this.encuesta.preguntas.forEach((p) => {
      if (p.complemento.length) {
        p.complemento.forEach((c) => {
          payload.push({
            preguntaId: c.id,
            respuesta: c.respuesta,
          });
        });
      } else {
        payload.push({
          preguntaId: p.id,
          respuesta: p.respuesta,
        });
      }
    });

    if (action === 'next') this._preguntaSeleccionadaIndex++;
    else this._preguntaSeleccionadaIndex--;

    setTimeout(() => {
      this.destroyComponent = false;
      this._cd.markForCheck();
    }, 100);
  }

  async sendData() {
    this._modal
      .confirm('¿Desea enviar estas respuestas?', '¿Segur@?')
      .subscribe(async (success) => {
        if (success) {
          const payload: RespuestaEncuestaPayload[] = [];
          this.encuesta.preguntas.forEach((p) => {
            if (p.complemento.length) {
              p.complemento.forEach((c) => {
                payload.push({
                  preguntaId: c.id,
                  respuesta: c.respuesta,
                });
              });
            } else {
              payload.push({
                preguntaId: p.id,
                respuesta: p.respuesta,
              });
            }
          });

          let result: any;

          if (this._encuestaKeyId === ENCUESTAS_KEY_IDS.caracterizacionVivienda) {
            result = await this._encuestasCtrl.storeRespuestasCaracterizacionVivienda(
              this._encuestadoSelected,
              payload,
            );
          } else if (this._encuestaKeyId === ENCUESTAS_KEY_IDS.caracterizacionFamiliar) {
            result = await this._encuestasCtrl.storeRespuestasCaracterizacionFamiliar(
              this._encuestadoSelected,
              payload,
            );
          }

          result.fold({
            right: () => {
              this._toast.success('La encuesta fue guardada correctamente');
              if (this._encuestaKeyId === ENCUESTAS_KEY_IDS.caracterizacionVivienda) {
                this._encuestadoSelected.cantViviendasPropias++;
              } else if (this._encuestaKeyId === ENCUESTAS_KEY_IDS.caracterizacionFamiliar) {
                this._encuestadoSelected.cantFamiliares++;
              }
              this.clickOnBack();
            },
            left: (error: string) => {
              this._toast.danger(error);
            },
          });
        }
      });
  }

  public async applyFilter() {
    const filterValue = this.filter;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private _instanceDataSource(data: Encuestado[]) {
    this.dataSource = new MatTableDataSource<Encuestado>(data);
    this._cd.markForCheck();
  }

  public async clickOnAddVivienda(encuestado: Encuestado) {
    this._encuestaKeyId = ENCUESTAS_KEY_IDS.caracterizacionVivienda;
    await this.fetchEncuesta(this._encuestaKeyId);
    this._encuestadoSelected = encuestado;
    this.showAddVivienda = true;
  }

  public async clickOnAddFamiliar(encuestado: Encuestado) {
    this._encuestaKeyId = ENCUESTAS_KEY_IDS.caracterizacionFamiliar;
    await this.fetchEncuesta(this._encuestaKeyId);
    this._encuestadoSelected = encuestado;
    this.showAddFamiliar = true;
  }

  public clickOnBack() {
    this._encuestaKeyId = undefined!;
    this._encuestadoSelected = undefined!;
    this.showAddFamiliar = false;
    this.showAddVivienda = false;
    this.encuesta = undefined!;
    this._preguntaSeleccionadaIndex = 0;
    this._cd.markForCheck();
  }

  public ngOnDestroy(): void {
    if (this._subscription) this._subscription.unsubscribe();
  }

  get lastUpdate(): string {
    return `ULTIMA ACTUALIZACIÓN A LAS ${this._lastUpdate!}`.toUpperCase();
  }

  get preguntaSeleccionadaIndex() {
    return this._preguntaSeleccionadaIndex + 1;
  }

  get preguntaSeleccionada() {
    return this.encuesta.preguntas[this._preguntaSeleccionadaIndex];
  }

  get tiposPregunta() {
    return TIPOS_PREGUNTA;
  }
}

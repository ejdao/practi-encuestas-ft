import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ENCUESTAS_KEY_IDS } from '@encuestas/application/constants';
import { ObservableUpdated } from '@encuestas/application/observables';
import { RespuestaEncuestaPayload } from '@encuestas/application/payloads';
import { EncuestaController, FormatoController } from '@encuestas/presentation/controllers';
import { IonButton, IonButtons, IonToolbar, IonTitle, IonIcon } from '@ionic/angular/standalone';
import { EncuestasImpl, FormatoImpl } from '@encuestas/infrastructure/services';
import { PreguntaComponent } from '@encuestas/presentation/components';
import { TsdFieldsModule } from '@toshida/ng-components/fields';
import { TsdModalService } from '@toshida/ng-components/modal';
import { TsdToastService } from '@toshida/ng-components/toast';
import { MatCheckboxModule } from '@toshida/material/checkbox';
import { MatRadioModule } from '@toshida/material/radio';
import { TIPOS_PREGUNTA } from '@encuestas/domain/types';
import { Encuesta } from '@encuestas/domain/entities';

@Component({
  imports: [
    PreguntaComponent,
    FormsModule,
    TsdFieldsModule,
    MatRadioModule,
    MatCheckboxModule,
    IonButton,
    IonButtons,
    IonToolbar,
    IonTitle,
    IonIcon,
  ],
  providers: [EncuestaController, FormatoController, EncuestasImpl, FormatoImpl, ObservableUpdated],
  selector: 'app-manage-encuestas-web',
  templateUrl: './page.html',
  styleUrl: './page.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Page implements OnInit {
  private _encuesta!: Encuesta;
  private _preguntaSeleccionadaIndex = 0;

  constructor(
    href: ElementRef<HTMLElement>,
    private _encuestasCtrl: EncuestaController,
    private _formatosCtrl: FormatoController,
    private _cd: ChangeDetectorRef,
    private _toast: TsdToastService,
    private _modal: TsdModalService,
    private _observable: ObservableUpdated,
  ) {
    href.nativeElement.classList.add('app-manage-encuestas-web');
  }

  public ngOnInit(): void {
    this.fetch();
  }

  public async fetch() {
    const result = await this._formatosCtrl.generar(ENCUESTAS_KEY_IDS.caracterizacionHogar);
    result.fold({
      right: (data) => {
        this._encuesta = data;
      },
      left: (error) => {
        this._toast.danger(error);
      },
    });
    this._cd.markForCheck();
  }

  public updateQuestion(action: 'next' | 'previous') {
    if (action === 'next') {
      this.updateObservable();
      this._preguntaSeleccionadaIndex++;
    } else {
      this._preguntaSeleccionadaIndex--;
    }
  }

  updateObservable() {
    this._observable.update();
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

          const result = await this._encuestasCtrl.storeRespuestasCaracterizacionHogar(payload);

          result.fold({
            right: async () => {
              this._toast.success('La encuesta fue guardada correctamente');
              await this.fetch();
              this._preguntaSeleccionadaIndex = 0;
            },
            left: async (error) => {
              this._toast.danger(error);
            },
          });
        }
      });
  }

  get encuesta() {
    return this._encuesta;
  }

  get preguntaSeleccionadaIndex() {
    return this._preguntaSeleccionadaIndex + 1;
  }

  get preguntaSeleccionada() {
    return this._encuesta.preguntas[this._preguntaSeleccionadaIndex];
  }

  get tiposPregunta() {
    return TIPOS_PREGUNTA;
  }
}

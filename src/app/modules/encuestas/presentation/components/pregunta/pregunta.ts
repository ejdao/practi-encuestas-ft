import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '@environments/environment';
import { EntidadBasica, Pregunta } from '@encuestas/domain/entities';
import { TIPOS_PREGUNTA } from '@encuestas/domain/types';
import { Subscription } from 'rxjs';
import { ObservableUpdated } from '@encuestas/application/observables';
import {
  TsdRemoteAutocompleteFieldComponent,
  TsdTextFieldComponent,
} from '@toshida/ng-components/fields';
import { MatCheckboxModule } from '@toshida/material/checkbox';
import { MatRadioModule } from '@toshida/material/radio';
import { CtmTypeI } from '@common/models';

@Component({
  standalone: true,
  imports: [
    TsdTextFieldComponent,
    FormsModule,
    TsdRemoteAutocompleteFieldComponent,
    ReactiveFormsModule,
    MatRadioModule,
    MatCheckboxModule,
  ],
  selector: 'app-pregunta',
  templateUrl: './pregunta.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreguntaComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() raiz!: Pregunta;
  @Input() pregunta!: Pregunta;
  @Input() preguntas!: Pregunta[];

  @Output() respuestaUpdated = new EventEmitter();

  @ViewChild('departamentoField') dptoField!: TsdRemoteAutocompleteFieldComponent;
  @ViewChild('municipioField') municipioField!: TsdRemoteAutocompleteFieldComponent;
  @ViewChild('corregimientoField') corrgtoField!: TsdRemoteAutocompleteFieldComponent;
  @ViewChild('ctmTypeField') ctmTypeField!: TsdRemoteAutocompleteFieldComponent;

  readonly departamentosUrl = `${environment.apiUrlGen}/v1/srd/ubicacion/departamentos`;
  readonly municipiosUrl = `${environment.apiUrlGen}/v1/srd/ubicacion/municipios`;
  readonly corregimientosUrl = `${environment.apiUrlGen}/v1/srd/ubicacion/corregimientos`;
  readonly barriosUrl = `${environment.apiUrlGen}/v1/srd/ubicacion/barrios`;
  readonly tiposDocumentoUrl = `${environment.apiUrlGen}/v1/encuestas/recursos/tipos-documento`;
  readonly parentezcoUrl = `${environment.apiUrlGen}/v1/encuestas/recursos/parentezcos`;
  readonly epsUrl = `${environment.apiUrlGen}/v1/gen/eps`;

  private _ctmTypeUrl = '';
  private _ctmTypeHasComplement = false;
  private _ctmTypeComplement = '';
  private _ctmTypeValue = 'nombre';

  private _subs1!: Subscription;
  private _subs2!: Subscription;

  private _timesDateUpdated = 0;
  private _justSearchOneTime = true;

  constructor(
    href: ElementRef<HTMLElement>,
    private _observable: ObservableUpdated,
    private _cd: ChangeDetectorRef,
  ) {
    href.nativeElement.classList.add('gcm-pregunta');
    href.nativeElement.classList.add('hibrid-mob-web');
  }

  ngAfterViewInit(): void {
    if (this.pregunta.respuesta) {
      const tipoPreg = this.pregunta.tipo;
      const entSelec = this.pregunta.entidadSeleccionada;

      if (tipoPreg === this.tiposPregunta.DEPARTAMENTO) this.dptoField.updateValue(entSelec);
      if (tipoPreg === this.tiposPregunta.MUNICIPIO) this.municipioField.updateValue(entSelec);
      if (tipoPreg === this.tiposPregunta.CORREGIMIENTO) this.corrgtoField.updateValue(entSelec);

      if (
        [
          this.tiposPregunta.TIPO_DOCUMENTO,
          this.tiposPregunta.PARENTEZCO,
          this.tiposPregunta.EPS,
        ].indexOf(tipoPreg) >= 0
      ) {
        this.ctmTypeField.updateValue(entSelec);
      }
    }
  }

  onValueUpdated() {
    this.respuestaUpdated.emit();
  }

  changeIfIsDate() {
    if (!this._timesDateUpdated) {
      this._timesDateUpdated++;
      if (this.pregunta.respuesta) this.pregunta.respuestaIfIsDate = this.pregunta.respuesta;
    } else this.pregunta.respuesta = this.pregunta.respuestaIfIsDate;
  }

  public verifyIfItWillBeIgnored() {
    if ([4, 18].indexOf(this.pregunta.id) >= 0) {
      this.preguntas.forEach((p) => {
        if (p.id === 32) {
          p.complemento.forEach((c) => {
            if (c.id === 3)
              if (c.respuesta === true) {
                this.pregunta.ignored = false;
              } else {
                this.pregunta.respuesta = undefined!;
                this.pregunta.ignored = true;
              }
          });
        }
      });
    }

    if ([6].indexOf(this.pregunta.id) >= 0) {
      this.preguntas.forEach((p) => {
        if (p.id === 33) {
          p.complemento.forEach((c) => {
            if (c.id === 5)
              if (c.respuesta === true) {
                this.pregunta.ignored = false;
              } else {
                this.pregunta.respuesta = '';
                this.pregunta.ignored = true;
              }
          });
        }
      });
    }

    if ([72, 73].indexOf(this.pregunta.id) >= 0) {
      this.preguntas.forEach((p) => {
        if (p.id === 70) {
          p.complemento.forEach((c) => {
            if (c.id === 71)
              if (c.respuesta === true) {
                this.pregunta.ignored = false;
              } else {
                this.pregunta.respuesta = null!;
                this.pregunta.ignored = true;
              }
          });
        }
      });
    }

    if ([76, 77, 79, 80, 81, 82, 83].indexOf(this.pregunta.id) >= 0) {
      this.preguntas.forEach((p) => {
        if (p.id === 70) {
          p.complemento.forEach((c) => {
            if (c.id === 73)
              if (c.respuesta === true) {
                this.pregunta.ignored = false;
              } else {
                if ([76, 77].indexOf(this.pregunta.id) >= 0) this.pregunta.respuesta = '';
                else this.pregunta.respuesta = null!;
                this.pregunta.ignored = true;
              }
          });
        }
      });
    }

    if ([86].indexOf(this.pregunta.id) >= 0) {
      this.preguntas.forEach((p) => {
        if (p.id === 84) {
          p.complemento.forEach((c) => {
            if (c.id === 85)
              if (c.respuesta === 123) {
                this.pregunta.ignored = true;
                if (this.ctmTypeField) {
                  this.ctmTypeField.reset();
                  this.ctmTypeField.disable();
                }
              } else {
                this.pregunta.ignored = false;
                this.ctmTypeField.enable();
              }
          });
        }
      });
    }

    if ([89].indexOf(this.pregunta.id) >= 0) {
      this.preguntas.forEach((p) => {
        if (p.id === 87) {
          p.complemento.forEach((c) => {
            if (c.id === 88)
              if (c.respuesta === 101) {
                this.pregunta.ignored = false;
              } else {
                this.pregunta.respuesta = undefined!;
                this.pregunta.ignored = true;
              }
          });
        }
      });
    }

    this._cd.markForCheck();
  }

  ngOnInit(): void {
    this._observable.observable().subscribe(() => {
      this.verifyIfItWillBeIgnored();
    });

    const tipoPreg = this.pregunta.tipo;

    if (tipoPreg === this.tiposPregunta.EPS) {
      this._ctmTypeUrl = this.epsUrl;
      this._ctmTypeHasComplement = true;
      this._ctmTypeComplement = 'nit';
      this._justSearchOneTime = false;
    }

    if (tipoPreg === this.tiposPregunta.TIPO_DOCUMENTO) {
      this._ctmTypeUrl = this.tiposDocumentoUrl;
      this._ctmTypeValue = 'forHumans';
    }

    if (tipoPreg === this.tiposPregunta.PARENTEZCO) {
      this._ctmTypeUrl = this.parentezcoUrl;
      this._ctmTypeValue = 'forHumans';
    }

    if (tipoPreg === this.tiposPregunta.MUNICIPIO) {
      this._subs1 = this.raiz.departamentoId.valueChanges.subscribe((value) => {
        if (!value) {
          this.municipioField.reset();
          this.municipioField.suggestions = [];
        }
      });
    }
    if (tipoPreg === this.tiposPregunta.CORREGIMIENTO) {
      this._subs1 = this.raiz.municipioId.valueChanges.subscribe((value) => {
        if (!value) {
          this.corrgtoField.reset();
          this.corrgtoField.suggestions = [];
        }
      });
      this._subs2 = this.raiz.departamentoId.valueChanges.subscribe((value) => {
        if (!value) {
          this.corrgtoField.reset();
          this.corrgtoField.suggestions = [];
        }
      });
    }
  }

  setValueFromEntidad(et: EntidadBasica | CtmTypeI<number>, isCtmType = false) {
    if (!isCtmType || [TIPOS_PREGUNTA.EPS].indexOf(this.pregunta.tipo) >= 0) {
      const e = et as EntidadBasica;
      this.pregunta.respuesta = e ? e.id : undefined!;
      this.pregunta.entidadSeleccionada = e ? e : undefined!;
    } else {
      const e = et as CtmTypeI<number>;
      this.pregunta.respuesta = e ? e.code : undefined!;
      this.pregunta.entidadSeleccionada = e ? e : undefined!;
    }
    if (this.pregunta.tipo === this.tiposPregunta.DEPARTAMENTO) {
      const e = et as EntidadBasica;
      this.raiz.departamentoId.setValue(e ? e.id : undefined!);
      if (!e) {
        this.raiz.municipioId.setValue(undefined!);
        this.raiz.corregimientoId.setValue(undefined!);
      }
    } else if (this.pregunta.tipo === this.tiposPregunta.MUNICIPIO) {
      const e = et as EntidadBasica;
      this.raiz.municipioId.setValue(e ? e.id : undefined!);
      if (!e) {
        this.raiz.corregimientoId.setValue(undefined!);
      }
    } else if (this.pregunta.tipo === this.tiposPregunta.CORREGIMIENTO) {
      const e = et as EntidadBasica;
      this.raiz.corregimientoId.setValue(e ? e.id : undefined!);
    }
  }

  update(completed: boolean, index?: number) {
    if (index === undefined) {
      this.pregunta.completed = completed;
      this.pregunta.respuesta = [];
      this.pregunta.opciones.forEach((t) => {
        (this.pregunta.respuesta as number[]).push(t.id);
        t.completed = completed;
      });
      if (completed) {
        this.pregunta.cantidadOpcionesSeleccionadas = this.pregunta.opciones.length;
      } else {
        this.pregunta.cantidadOpcionesSeleccionadas = 0;
      }
    } else {
      this.pregunta.opciones[index].completed = completed;
      this.pregunta.completed = this.pregunta.opciones.every((t) => t.completed) ?? true;
      if (completed) {
        this.pregunta.cantidadOpcionesSeleccionadas++;
        (this.pregunta.respuesta as number[]).push(this.pregunta.opciones[index].id);
      } else {
        this.pregunta.cantidadOpcionesSeleccionadas--;
        this.pregunta.respuesta = (this.pregunta.respuesta as number[]).filter(
          (r) => r !== this.pregunta.opciones[index].id,
        );
      }
    }

    return { ...this.pregunta };
  }

  ngOnDestroy(): void {
    if (this._subs1) this._subs1.unsubscribe();
    if (this._subs2) this._subs2.unsubscribe();
  }

  get tiposPregunta() {
    return TIPOS_PREGUNTA;
  }

  get ctmTypeUrl() {
    return this._ctmTypeUrl;
  }

  get ctmTypeHasComplement() {
    return this._ctmTypeHasComplement;
  }

  get ctmTypeValue() {
    return this._ctmTypeValue;
  }

  get ctmTypeComplement() {
    return this._ctmTypeComplement;
  }

  get justSearchOneTime() {
    return this._justSearchOneTime;
  }
}

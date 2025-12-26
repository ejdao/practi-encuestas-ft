import {
  ChangeDetectionStrategy,
  ViewEncapsulation,
  EventEmitter,
  ElementRef,
  Component,
  Output,
  Input,
} from '@angular/core';
import {
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonCard,
  IonIcon,
} from '@ionic/angular/standalone';
import { Encuestado } from '@encuestas/domain/entities';

@Component({
  imports: [
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonToolbar,
    IonButton,
    IonButtons,
    IonIcon,
  ],
  selector: 'app-jefes-hogar-usuario-card',
  templateUrl: './usuario-card.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsuarioCardModule {
  @Input() data!: Encuestado;
  @Input() index!: number;

  @Output() onAddVivienda = new EventEmitter();
  @Output() onAddFamiliar = new EventEmitter();

  constructor(href: ElementRef<HTMLElement>) {
    href.nativeElement.classList.add('app-jefes-hogar-usuario-card');
  }
}

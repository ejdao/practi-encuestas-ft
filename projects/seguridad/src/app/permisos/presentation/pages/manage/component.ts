import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-manage-permisos-web',
  templateUrl: './component.html',
  styleUrl: './component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageComponent {
  constructor(href: ElementRef<HTMLElement>) {
    href.nativeElement.classList.add('app-manage-permisos-web');
  }
}

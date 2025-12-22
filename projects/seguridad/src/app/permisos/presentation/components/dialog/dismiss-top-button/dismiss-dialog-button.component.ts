import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  standalone: false,
  selector: 'gcm-dismiss-dialog-button',
  host: {
    directive: 'tak-dialog-title',
  },
  template: `
    <div class="gcm-modal__top-container-custom">
      <h1 class="gcm-modal__top-container-custom-title">
        <ng-content></ng-content>
      </h1>
      <button mat-icon-button (click)="dismiss.emit()"><mat-icon>close</mat-icon></button>
    </div>
    <mat-divider />
    <input style="display: none !important;" cdkFocusInitial />
  `,
  styleUrls: ['./dismiss-dialog-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GcmDismissDialogButton {
  @Output() dismiss = new EventEmitter<boolean>();
}

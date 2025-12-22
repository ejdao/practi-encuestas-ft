import { NgModule } from '@angular/core';

import { GcmDismissDialogButton } from './dismiss-top-button/dismiss-dialog-button.component';
import { MatButtonModule } from '@toshida/material/button';
import { MatDialogModule } from '@toshida/material/dialog';
import { MatDividerModule } from '@toshida/material/divider';
import { MatIconModule } from '@toshida/material/icon';

const components = [GcmDismissDialogButton];

@NgModule({
  declarations: components,
  imports: [MatIconModule, MatButtonModule, MatDividerModule, MatDialogModule],
  exports: [...components, MatDialogModule],
})
export class GcmDialogModule {}

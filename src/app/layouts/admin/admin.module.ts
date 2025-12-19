import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin.component';
import { MatDialogModule } from '@toshida/material/dialog';
import { MatButtonModule } from '@toshida/material/button';
import { MatIconModule } from '@toshida/material/icon';
import { TsdTextFieldComponent } from '@toshida/ng-components/fields';
import { TakOriginLayoutModule } from '@toshida/ng-components/layouts/admin-takkion';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [
    TakOriginLayoutModule,
    TsdTextFieldComponent,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    RouterModule,
  ],
})
export class AdminLayoutModule {}

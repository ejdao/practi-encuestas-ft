import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin.component';
import { MatDialogModule } from '@toshida/material/dialog';
import { MatButtonModule } from '@toshida/material/button';
import { MatIconModule } from '@toshida/material/icon';
import { TakOriginLayoutModule } from '@toshida/ng-components/layouts/admin-takkion';

@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [TakOriginLayoutModule, MatButtonModule, MatDialogModule, MatIconModule, RouterModule],
})
export class AdminLayoutModule {}

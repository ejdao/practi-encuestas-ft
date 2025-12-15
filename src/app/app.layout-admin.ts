import { RouterOutlet } from '@angular/router';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AdminDashboardContainerComponent } from '@toshida/ng-components/layouts/admin';
import { TsdLayoutsMenuSection } from '@toshida/ng-components/layouts';
import { APP_NAVIGATION } from 'src/app/app.navigation';

@Component({
  selector: 'app-admin-dashboard',
  imports: [AdminDashboardContainerComponent, RouterOutlet],
  template: `
    <tsd-admin-db-container [menuSections]="menuSections">
      <router-outlet />
    </tsd-admin-db-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent {
  menuSections = signal<TsdLayoutsMenuSection[]>(APP_NAVIGATION);
}

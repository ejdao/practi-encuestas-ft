import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminDashboardComponent } from '@toshida/ng-components/layouts/default';
import { TsdLayoutsMenuSection } from '@toshida/ng-components/layouts';
import { APP_NAVIGATION } from './app.navigation';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AdminDashboardComponent],
  templateUrl: './app.html',
})
export class App {
  menuSections = signal<TsdLayoutsMenuSection[]>(APP_NAVIGATION);
}

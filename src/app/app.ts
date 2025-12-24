import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SessionStore } from '@stores/session';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    @if (sessionWasLoaded()) {
      <router-outlet />
    } @else {
      <div class="tsd-view-loader">
        <div class="tsd-spinner">
          <div class="tsd-double-bounce1"></div>
          <div class="tsd-double-bounce2"></div>
        </div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  sessionWasLoaded = signal(false);

  constructor(private _session: SessionStore) {}

  async ngOnInit(): Promise<void> {
    try {
      await this._session.autoInstance();

      const subscription = this._session.observable().subscribe((session) => {
        if (session.wasLoaded) this.sessionWasLoaded.set(true);
      });

      subscription.unsubscribe();
    } catch (error: any) {
      this.sessionWasLoaded.set(true);
    }
  }
}

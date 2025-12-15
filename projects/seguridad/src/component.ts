import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <h1>Seguridad</h1>
    <div class="mf-divider"></div>
    <section>
      <p>Modulo iniciado el 11/Dic/25.</p>
    </section>
  `,
  styles: [
    `
      .mf-divider {
        border: 1px solid rgba(0, 0, 0, 0.12);
      }
    `,
  ],
})
export class App {}

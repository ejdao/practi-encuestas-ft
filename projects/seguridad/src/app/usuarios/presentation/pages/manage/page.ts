import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ManageUsuarioFormComponent } from '../../components/manage-usuario-form';

@Component({
  imports: [ManageUsuarioFormComponent],
  selector: 'app-usuarios-manage-web',
  templateUrl: './page.html',
  styleUrls: ['./page.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Page {}

import { Observable } from 'rxjs';
import { Permiso } from '../entities';

export interface PermisoRepository {
  fetch(refresh: boolean): Promise<Permiso[]>;
  observable(): Observable<Permiso[]>;
}

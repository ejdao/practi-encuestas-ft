import { Observable } from 'rxjs';
import { Permiso } from '../entities';

export abstract class PermisoRepository {
  abstract fetch(refresh: boolean): Promise<Permiso[]>;
  abstract observable(): Observable<Permiso[]>;
}

import { Observable } from 'rxjs';
import { Rol } from '../entities';

export interface RolRepository {
  fetch(refresh: boolean): Promise<Rol[]>;

  observable(): Observable<Rol[]>;
}

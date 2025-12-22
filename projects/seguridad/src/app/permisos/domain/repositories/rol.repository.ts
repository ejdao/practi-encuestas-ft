import { Observable } from 'rxjs';
import { Rol } from '../entities';

export abstract class RolRepository {
  abstract fetch(refresh: boolean): Promise<Rol[]>;
  abstract observable(): Observable<Rol[]>;
}

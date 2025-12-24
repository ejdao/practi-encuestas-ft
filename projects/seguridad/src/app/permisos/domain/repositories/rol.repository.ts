import { Observable } from 'rxjs';
import { Rol } from '../entities';
import { DataStoredI } from '@common/models';

export abstract class RolRepository {
  abstract fetch(refresh: boolean): Promise<Rol[]>;
  abstract observable(): Observable<DataStoredI<Rol>>;
}

import { Observable } from 'rxjs';
import { Permiso } from '../entities';
import { DataStoredI } from '@common/models';

export abstract class PermisoRepository {
  abstract fetch(refresh: boolean): Promise<Permiso[]>;
  abstract observable(): Observable<DataStoredI<Permiso>>;
}

import { DataStoredI } from '@common/models';
import { Usuario } from '../entities';
import { Observable } from 'rxjs';

export abstract class UsuarioCrudRepository {
  abstract fetch(refresh: boolean): Promise<Usuario[]>;
  abstract resetPassword(id: string): Promise<boolean>;
  abstract observable(): Observable<DataStoredI<Usuario>>;
}

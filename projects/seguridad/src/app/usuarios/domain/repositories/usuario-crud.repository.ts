import { DataStoredI } from '@common/models';
import { Usuario } from '../entities';
import { Observable } from 'rxjs';
import { CreateUsuarioPayload } from '@seguridad/usuarios/application/payloads';

export abstract class UsuarioCrudRepository {
  abstract fetch(refresh: boolean): Promise<Usuario[]>;
  abstract save(payload: CreateUsuarioPayload): Promise<boolean>;
  abstract resetPassword(id: string): Promise<boolean>;
  abstract observable(): Observable<DataStoredI<Usuario>>;
}

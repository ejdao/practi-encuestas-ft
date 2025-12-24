import { Observable } from 'rxjs';
import { Usuario } from '@seguridad/permisos/domain/entities';
import { DataStoredI } from '@common/models';
import { Permiso } from '../entities';

export abstract class UsuarioRepository {
  abstract fetch(refresh: boolean): Promise<Usuario[]>;
  abstract fetchAuthorities(id: string): Promise<Permiso[]>;
  abstract observable(): Observable<DataStoredI<Usuario>>;
}

import { BehaviorSubject } from 'rxjs';
import { DataStoredI } from '@common/models';
import { Usuario } from '@seguridad/usuarios/domain/entities';

export const usuariosSubj = new BehaviorSubject<DataStoredI<Usuario>>(new DataStoredI([], null));
export const usuariosObs$ = usuariosSubj.asObservable();

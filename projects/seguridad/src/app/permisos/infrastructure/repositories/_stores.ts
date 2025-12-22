import { BehaviorSubject } from 'rxjs';
import { DataStoredI } from '@common/models';
import { Permiso, Rol, Usuario } from '@seguridad/permisos/domain/entities';

export const usuariosSubj = new BehaviorSubject<DataStoredI<Usuario>>(new DataStoredI([], null));
export const usuariosObs$ = usuariosSubj.asObservable();

export const permisosSubj = new BehaviorSubject<DataStoredI<Permiso>>(new DataStoredI([], null));
export const permisosObs$ = permisosSubj.asObservable();

export const rolesSubj = new BehaviorSubject<DataStoredI<Rol>>(new DataStoredI([], null));
export const rolesObs$ = rolesSubj.asObservable();

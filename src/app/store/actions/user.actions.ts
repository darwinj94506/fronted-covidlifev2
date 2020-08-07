import { createAction, props } from '@ngrx/store';
import { IdIn, AsignarRoleIn } from '../../core/domain/inputs';
import { UserPerfilOut, FiltrarSeguimientoOut, AsignarRoleOut } from '../../core/domain/outputs';

export const loadMiPerfil = createAction(
  '[User] Load Mi Perfil',
  props<{ idUser: IdIn }>()
)

export const loadMiPerfilSuccess = createAction(
  '[User] Load Mi Perfil Success',
  props<{ miPerfil: UserPerfilOut }>()
)

export const loadMiPerfilError = createAction(
  '[User] Load Mi Perfil Error',
  props<{ error: String }>()
)

export const loadPerfilUser = createAction(
  '[User] Load Perfil User',
  props<{ idUser: IdIn }>()
)

export const loadPerfilUserSuccess = createAction(
  '[User] Load Perfil User Success',
  props<{ userPerfil: UserPerfilOut }>()
)

export const loadPerfilUserError = createAction(
  '[User] Load Perfil User Error',
  props<{ error: String }>()
)


export const openModalCreateUpdateUser = createAction(
  '[User] Open Modal Create Update User',
  props<{ user }>()
)

export const openModalPatient = createAction(
  '[User] Open Modal Patient',
  props<{ seguimiento: FiltrarSeguimientoOut }>()
)

export const asignarRoles = createAction(
  '[User] Asignar Roles',
  props<{ roles: AsignarRoleIn }>()
)

export const asignarRolesSuccess = createAction(
  '[User] Asignar Roles Success',
  props<{ rolesOutput: AsignarRoleOut }>()
)

export const asignarRolesError = createAction(
  '[User] Asignar Roles Error',
  props<{ error: String }>()
)

export const openModalAsignarRoles = createAction(
  '[User] Open Modal Asignar Roles',
  props<{ roles: AsignarRoleIn }>()
)
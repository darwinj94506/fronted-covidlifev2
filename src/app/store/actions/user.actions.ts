import { createAction, props } from '@ngrx/store';
import { IdIn } from '../../core/domain/inputs';
import { UserPerfilOut } from '../../core/domain/outputs';

export const loadPerfil = createAction(
  '[User] Load Perfil User',
  props<{ idUser: IdIn }>()
)

export const loadPerfilSuccess = createAction(
  '[User] Load Perfil User Success',
  props<{ userPerfil: UserPerfilOut }>()
)

export const loadPerfilError = createAction(
  '[User] Load Perfil Error',
  props<{ error: String }>()
)


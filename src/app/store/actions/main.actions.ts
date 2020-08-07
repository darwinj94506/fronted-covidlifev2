import { createAction, props } from '@ngrx/store';
import { IUsuarioEntity } from '../../core/domain/entities';
import { FilterUserIn } from '../../core/domain/inputs';
import { LoginOut, VORoleHospitalPopulateLoginOut } from '../../core/domain/outputs';

export const loadUserLogged = createAction(
  '[Main] Load User Logged'
);

export const loadUserLoggedSuccess = createAction(
  '[Main] Load User Logged Success',
  props<{ userLogged: LoginOut}>()
);

export const loadUserLoggedError =createAction(
  '[Main] Load User Logged Error',
  props<{ error:String}>()
)

export const saveHospitalSession =createAction(
  '[Main] Save Hospital Session',
  props<{ hospitalSession: VORoleHospitalPopulateLoginOut}>()
)

export const saveUserLogged =createAction(
  '[Main] Save User Logged',
  props<{ userLogged: LoginOut}>()
)

export const loadUsers = createAction(
  '[Main] Load Users',
  props<{ filter: FilterUserIn }>()
)

export const loadUsersSuccess = createAction(
  '[Main] Load Users Success',
  props<{ users: IUsuarioEntity [] }>()
)

export const loadUsersError = createAction(
  '[Main] Load Users Error'
)

export const createUser = createAction(
  '[Main] Create User',
  props<{ user: IUsuarioEntity }>()
)


export const createUserSuccess = createAction(
  '[Main] Create User Success'
)


export const createUserError = createAction(
  '[Main] Create User Error'
)

export const updateUser = createAction(
  '[Main] Update User',
  props<{ user: IUsuarioEntity }>()
)

export const updateUserSuccess = createAction(
  '[Main] Update User Success'
)


export const updateUserError = createAction(
  '[Main] Update User Error'
)

export const logout = createAction(
  '[Main] Logout'
)

export const logoutSuccess = createAction(
  '[Main] Logout Success'
)

export const logoutError = createAction(
  '[Main] Logout Error'
)
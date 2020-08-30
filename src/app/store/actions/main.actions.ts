import { createAction, props } from '@ngrx/store';
import { IUsuarioEntity, IHospitalEntity, IEspacioEntity } from '../../core/domain/entities';
import { FilterUserIn, FilterHospitalIn } from '../../core/domain/inputs';
import { LoginOut, VORoleHospitalPopulateLoginOut, FilterUserOut } from '../../core/domain/outputs';
import { EspacioEnum } from '../../core/domain/enums';
import { FilterEspaceIn } from '../../core/domain/inputs';

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
  props<{ users: FilterUserOut [] }>()
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

export const cargarHospitales = createAction(
  '[Main] Cargar Hospitales',
  props<{ filter: FilterHospitalIn}>()
);

export const cargarHospitalesExito = createAction(
  '[Main] Cargar Hospitales Éxito',
  props<{ Hospitales: IHospitalEntity[] }>()
);

export const cargarHospitalesError = createAction(
  '[Main] Cargar Hospital Error',
  props<{ error: string }>()
);

export const cargarEspacios = createAction(
  '[Main] Cargar Espacios',
  props<{ tipo: EspacioEnum, filtro: FilterEspaceIn }>()
);

export const cargarEspacioExito = createAction(
  '[Main] Cargar Espacios Éxito',
  props<{ espacios: IEspacioEntity[], tipo: EspacioEnum }>()
);

export const cargarEspacioError = createAction(
  '[Main] Cargar Espacios Error',
  props<{ error:any ,  tipo: EspacioEnum }>()
);
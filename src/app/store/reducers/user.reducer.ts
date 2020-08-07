import { Action, createReducer, on } from '@ngrx/store';
import * as userActions  from '../actions/user.actions';
import { UserPerfilOut } from '../../core/domain/outputs';
export interface UserState {
  isLoadingMiPerfil: boolean;
  isLoadingPerfilUser: boolean; 
  miPerfil: UserPerfilOut,
  userPerfil: UserPerfilOut 
}


const userInit: UserPerfilOut = {
  _id:'',
  name:'',
  lastname:'',
  ci:'',
  email:'',
  telefono:'',
  fechaNacimiento:null,
  genero:null,
  isRoot:false,
  motivo_alta_sistema:null,
  roles:null,
  ultimoAcceso:null,
  datos_paciente:null,
}
export const initialState: UserState = {
  isLoadingMiPerfil: false,
  isLoadingPerfilUser: false,
  miPerfil: {...userInit},
  userPerfil: { ...userInit}
};

const userReducer = createReducer(
  initialState,
  on(userActions.loadMiPerfil, (state) => ({
      ...state,
      isLoadingMiPerfil:true,
  })),
  on(userActions.loadMiPerfilSuccess, (state, payload) => ({
    ...state,
    miPerfil: payload.miPerfil,
    isLoadingMiPerfil:false
  })),
  on(userActions.loadMiPerfilError, state => ({
    ...state,
    isLoadingMiPerfil:false,
  })),
  on(userActions.loadPerfilUser, (state) => ({
    ...state,
    isLoadingPerfilUser:true,
  })),
  on(userActions.loadPerfilUserSuccess, (state, payload) => ({
    ...state,
    userPerfil:payload.userPerfil,
    isLoadingPerfilUser:false
  })),
  on(userActions.loadPerfilUserError, state => ({
    ...state,
    isLoadingPerfilUser:false,
  })),

);

export function reducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}

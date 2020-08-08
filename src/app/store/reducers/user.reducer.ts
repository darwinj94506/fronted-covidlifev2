import { Action, createReducer, on } from '@ngrx/store';
import * as userActions  from '../actions/user.actions';
import { UserPerfilOut, FilterUserOut } from '../../core/domain/outputs';
export interface UserState {
  isLoadingMiPerfil: boolean;
  isLoadingPerfilUser: boolean; 
  isSearchingUsers:boolean;
  miPerfil: UserPerfilOut,
  userPerfil: UserPerfilOut,
  findedUsers: FilterUserOut[]
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
  isSearchingUsers:false,
  miPerfil: {...userInit},
  userPerfil: { ...userInit},
  findedUsers: []
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

  on(userActions.searchUser, (state) => ({
    ...state,
    isSearchingUsers:true,
  })),
  on(userActions.searchUserSuccess, (state, payload) => ({
    ...state,
    findedUsers:payload.findedUsers,
    isSearchingUsers:false
  })),
  on(userActions.searchUserError, state => ({
    ...state,
    isSearchingUsers:false,
  })),

);

export function reducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}

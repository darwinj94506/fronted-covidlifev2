import { Action, createReducer, on } from '@ngrx/store';
import * as userActions  from '../actions/user.actions';
import { UserPerfilOut } from '../../core/domain/outputs';
export interface UserState {
  isLoading: boolean; 
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
  isLoading: false,
  userPerfil: {...userInit}
};

const userReducer = createReducer(
  initialState,
  on(userActions.loadPerfil, state => ({
      ...state,
      isLoading:true,
  })),
  on(userActions.loadPerfilSuccess, (state, payload) => ({
    ...state,
    userPerfil: payload.userPerfil,
    isLoading:false
  })),
  on(userActions.loadPerfilError, state => ({
    ...state,
    isLoading:false,
  })),

);

export function reducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}

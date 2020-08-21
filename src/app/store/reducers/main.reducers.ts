import { Action, createReducer, on } from '@ngrx/store';
import * as authActions  from '../actions/main.actions';
import { IUsuarioEntity, IHospitalEntity } from '../../core/domain/entities';
import { LoginOut, VORoleHospitalPopulateLoginOut, FilterUserOut } from '../../core/domain/outputs';
export interface MainState {
  userLogged: LoginOut;
  isLoading: boolean;
  users : FilterUserOut[];
  isLoadingUsers: boolean; 
  hospitalSession: VORoleHospitalPopulateLoginOut;
  isLogged: boolean;
  hospitales: IHospitalEntity[];
  isLoadingHospitales: boolean;
  
}

const initUser: LoginOut = {
  _id:'',
  name:'',
  lastname:'',
  ci:'',
  email:'',
  isRoot:false,
  roles:[]
}
const initVORoleHospital: VORoleHospitalPopulateLoginOut = {
  idHospital:{
    _id:'',
    nombre:'',
    idEspacio:'',
    descripcion:''
  },
  roles:[]
}

export const initialState: MainState = {
  userLogged: { ...initUser },
  isLoading: false,
  users : [],
  isLoadingUsers: false,
  hospitalSession: {...initVORoleHospital},
  isLogged: false,
  isLoadingHospitales: false,
  hospitales: []
};

const mainReducer = createReducer(
  initialState,
  on(authActions.loadUserLogged, state => ({
      ...state,
      isLoading:true,
  })),
  on(authActions.loadUserLoggedSuccess, (state, payload) => { 
    // console.log(payload.userLogged)
    return({
    ...state,
    isLoading:false,
    isLogged:true,
    userLogged: {...payload.userLogged}
  })}),
  on(authActions.loadUserLoggedError, (state) => ({
    ...state,
    isLoading:false,
  })),
  on(authActions.loadUsers, (state) => ({
    ...state,
    isLoadingUsers:true
  })),
  on(authActions.loadUsersSuccess, (state, payload) => ({
    ...state,
    users: payload.users,
    isLoadingUsers: false
  })),
  on(authActions.loadUsersError, (state) => ({
    ...state,
    isLoadingUsers: false
  })),
  on(authActions.createUser, (state) => ({
    ...state,
    isLoadingUsers: true
  })),
  on(authActions.createUserSuccess, (state) => ({
    ...state,
    isLoadingUsers: false
  })),
  on(authActions.createUserError, (state) => ({
    ...state,
    isLoadingUsers: false
  })),
  on(authActions.updateUser, (state) => ({
    ...state,
    isLoadingUsers: true
  })),
  on(authActions.updateUserSuccess, (state) => ({
    ...state,
    isLoadingUsers: false
  })),
  on(authActions.updateUserError, (state) => ({
    ...state,
    isLoadingUsers: false
  })),
  on(authActions.saveHospitalSession, (state, payload) => ({
    ...state,
    hospitalSession:payload.hospitalSession
  })),
  on(authActions.saveUserLogged, (state, payload) => ({
    ...state,
    userLogged:payload.userLogged,
    isLogged:true
  })),
  on(authActions.logout, state=>({
    ...state,
    isLogged:false,
  })),
  on(authActions.cargarHospitales, state => ({
    ...state,
    isLoadingHospitales: true,
  })),
  on(authActions.cargarHospitalesExito, (state, payload) => ({
    ...state,
    isLoadingHospitales: false,
    hospitales: payload.Hospitales
  })),
  on(authActions.cargarHospitalesError, (state) => ({
    ...state,
    isLoadingHospitales: false
  })),
);

export function reducer(state: MainState | undefined, action: Action) {
  return mainReducer(state, action);
}

export const getMainState = (state:MainState)=> state
export const getUserLogged = (state:MainState)=> state.userLogged
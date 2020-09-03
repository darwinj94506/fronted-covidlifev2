import { Action, createReducer, on } from '@ngrx/store';
import * as authActions  from '../actions/main.actions';
import { IUsuarioEntity, IHospitalEntity } from '../../core/domain/entities';
import { LoginOut, 
         VORoleHospitalPopulateLoginOut,
         VerEspacioOut, 
         FilterUserOut } from '../../core/domain/outputs';
import { IEspacioEntity } from '../../core/domain/entities'
import { EspacioEnum } from '../../core/domain/enums';
export interface MainState {
  userLogged: LoginOut;
  isLoading: boolean;
  users : FilterUserOut[];
  isLoadingUsers: boolean; 
  hospitalSession: VORoleHospitalPopulateLoginOut;
  isLogged: boolean;
  hospitales: IHospitalEntity[];
  isLoadingHospitales: boolean;
  provincias: IEspacioEntity [];
  cantones: IEspacioEntity [];
  parroquias: IEspacioEntity [];
  barrios: IEspacioEntity [];
  isLoadingProvincias: boolean;
  isLoadingCantones: boolean;
  isLoadingParroquias: boolean;
  isLoadingBarrios: boolean;
  detalleEspacio:VerEspacioOut,
  isLoadingDetalleEspacio:boolean
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
const detalleEspacio : VerEspacioOut = {
  nombre: ''
}

export const initialState: MainState = {
  userLogged: { ...initUser },
  isLoading: false,
  users : [],
  isLoadingUsers: false,
  hospitalSession: {...initVORoleHospital},
  isLogged: false,
  isLoadingHospitales: false,
  hospitales: [],
  provincias: [],
  cantones:[],
  parroquias:[],
  barrios:[],
  isLoadingProvincias: false,
  isLoadingCantones: false,
  isLoadingParroquias: false,
  isLoadingBarrios: false,
  detalleEspacio,
  isLoadingDetalleEspacio:false
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

  on(authActions.cargarEspacios, (state, payload) => {
    switch(payload.tipo){
        case EspacioEnum.PROVINCIA :
            return { ...state, isLoadingProvincias:true, cantones:[], parroquias:[], barrios:[] }
        case EspacioEnum.CANTON :
            return { ...state, isLoadingCantones:true, parroquias:[], barrios:[] }
        case EspacioEnum.PARROQUIA :
            return { ...state, isLoadingParroquias:true, barrios:[] }
        case EspacioEnum.BARRIO :
            return { ...state, isLoadingBarrios:true }
    }
  }), 
  on(authActions.cargarEspacioExito, (state, payload) => {
    switch(payload.tipo){
        case EspacioEnum.PROVINCIA :
            return { ...state, isLoadingProvincias:false, provincias: payload.espacios }
        case EspacioEnum.CANTON :
            return { ...state, isLoadingCantones:false, cantones: payload.espacios }
        case EspacioEnum.PARROQUIA :
            return { ...state, isLoadingParroquias:false, parroquias: payload.espacios}
        case EspacioEnum.BARRIO :
            return { ...state, isLoadingBarrios:false, barrios: payload.espacios}
    }
  }),
  on(authActions.cargarEspacioError, (state, payload) => {
    switch(payload.tipo){
        case EspacioEnum.PROVINCIA :
            return { ...state, isLoadingProvincias:false, provincias:[], cantones:[], parroquias:[], barrios:[]  }
        case EspacioEnum.CANTON :
            return { ...state, isLoadingCantones:false, cantones:[], parroquias:[], barrios:[] }
        case EspacioEnum.PARROQUIA :
            return { ...state, isLoadingParroquias:false, parroquias:[], barrios:[] }
        case EspacioEnum.BARRIO :
            return { ...state, isLoadingBarrios:false, barrios:[] }
    }
  }),
  on(authActions.verDetalleEspacio, state => ({
    ...state,
    isLoadingDetalleEspacio: true,
  })),
  on(authActions.verDetalleEspacioSuccess, (state, payload) => ({
    ...state,
    isLoadingDetalleEspacio: false,
    detalleEspacio: payload.espacio
  })),
  on(authActions.verDetalleEspacioError, (state) => ({
    ...state,
    isLoadingDetalleEspacio: false
  })),
);

export function reducer(state: MainState | undefined, action: Action) {
  return mainReducer(state, action);
}

export const getMainState = (state:MainState)=> state
export const getUserLogged = (state:MainState)=> state.userLogged
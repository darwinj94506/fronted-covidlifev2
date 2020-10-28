import { Action, createReducer, on } from '@ngrx/store';
import * as userActions  from '../actions/user.actions';
import { UserPerfilOut, FilterUserOut } from '../../core/domain/outputs';
export interface UserState {
  isLoadingMiPerfil: boolean;
  isLoadingPerfilUser: boolean; 
  isSearchingUsers:boolean;
  miPerfil: UserPerfilOut,
  userPerfil: UserPerfilOut,
  findedUsers: FilterUserOut[],
  actualizandoUsuario:boolean;
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
  findedUsers: [],
  actualizandoUsuario:false
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
  on(userActions.updateUser, (state) => ({
    ...state,
    actualizandoUsuario:true,
  })),
  on(userActions.updateUserSuccess, (state, payload) => {
    console.log(payload.user);
    return {
    ...state,
    miPerfil: { 
      _id: state.miPerfil._id,
      name: payload.user.name,
      lastname: payload.user.lastname,
      ci: payload.user.ci,
      email: payload.user.email,
      state: state.miPerfil.state,
      roles: state.miPerfil.roles,
      telefono: payload.user.telefono,
      isRoot: state.miPerfil.isRoot,
      ultimoAcceso: state.miPerfil.ultimoAcceso, 
      motivo_alta_sistema:state.miPerfil.motivo_alta_sistema,
      direccion: payload.user.direccion,
      fechaNacimiento: payload.user.fechaNacimiento,
      genero: payload.user.genero,
      latitud: payload.user.latitud,
      longitud: payload.user.longitud,
      datos_paciente: payload.user.datos_paciente?{
        aislado_por:payload.user.datos_paciente.aislado_por,
        alergia_medicamentos:payload.user.datos_paciente.alergia_medicamentos,
        tiene_diagnosticado_enfermedad:payload.user.datos_paciente.tiene_diagnosticado_enfermedad,
        es_diagnosticado_cancer:payload.user.datos_paciente.es_diagnosticado_cancer,
        es_embarazada: payload.user.datos_paciente.es_embarazada,
        esta_dando_lactar: payload.user.datos_paciente.esta_dando_lactar,
        fue_es_fumador:payload.user.datos_paciente.fue_es_fumador,
        tiene_carnet_discapacidad: payload.user.datos_paciente.tiene_carnet_discapacidad,
        tiene_diabetes: payload.user.datos_paciente.tiene_diabetes,
        tiene_presion_alta: payload.user.datos_paciente.tiene_presion_alta,
        familiares_cerco: payload.user.datos_paciente.familiares_cerco
      }: null
    },
    actualizandoUsuario:false
  }}),
  on(userActions.updateUserError, state => ({
    ...state,
    actualizandoUsuario:false
  })),
);

export function reducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}

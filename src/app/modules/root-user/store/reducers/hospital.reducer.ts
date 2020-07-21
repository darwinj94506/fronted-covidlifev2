import { Action, createReducer, on } from '@ngrx/store';
import * as accionesHospital  from '../actions/hospital.actions';
import { IHospitalEntity } from '../../../../core/domain/entities/hospital.entity';
export interface HospitalState {
  hospitales: IHospitalEntity[];
  isLoading:boolean;
}

export const initialState: HospitalState = {
  hospitales: [],
  isLoading:false
};

const hospitalReducer = createReducer(
  initialState,
  on(accionesHospital.cargarHospitales, state => ({
      ...state,
      isLoading:true,
  })),
  on(accionesHospital.cargarHospitalesExito, (state, payload) => ({
    ...state,
    isLoading:false,
    hospitales: payload.Hospitales
  })),
  on(accionesHospital.cargarHospitalesError, (state, payload) => ({
    ...state,
    isLoading:false
  })),

  on(accionesHospital.crearHospital, state => ({
    ...state,
    isLoading:true
  })),
  on(accionesHospital.crearHospitalExito, (state) => ({
    ...state,
    isLoading:false
  })),
  on(accionesHospital.crearHospitalError, (state) => ({
    ...state,
    isLoading:false
  })),
  on(accionesHospital.actualizarHospital, state => ({
    ...state,
    isLoading:true
  })),
  on(accionesHospital.actualizarHospitalExito, (state) => ({
    ...state,
    isLoading:false
  })),
  on(accionesHospital.actualizarHospitalError, (state) => ({
    ...state,
    isLoading:false
  })),
  on(accionesHospital.eliminarHospital, state => ({
    ...state,
    isLoading:true
  })),
  on(accionesHospital.eliminarHospitalExito, (state) => ({
    ...state,
    isLoading:false
  })),
  on(accionesHospital.eliminarHospitalExito, (state, payload) => ({
    ...state,
    isLoading:false
  })),
  
  
  
 

);

export function reducer(state: HospitalState | undefined, action: Action) {
  return hospitalReducer(state, action);
}


export const getHospitalState = (state:HospitalState)=> state
// export const getAuthAction = (action:any)=> action.payload
// export const getAuthLoading = (state:HospitalState)=> state.isLoading
// export const getAuthError = (state:HospitalState)=> state.error
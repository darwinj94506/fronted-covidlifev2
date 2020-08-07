import { Action, createReducer, on } from '@ngrx/store';
import * as seguimientosActions  from '../actions/seguimiento.actions';
import { FiltrarSeguimientoOut } from '../../core/domain/outputs';
export interface SeguimientoState {
  isLoadingSeguimiento: boolean;
  isLoadingSeguimientosAgendados:boolean;
  seguimientosAgendados : FiltrarSeguimientoOut [];
  citasPaciente: FiltrarSeguimientoOut[];
  isLoadingCitasPacientes:boolean;
} 
export const initialState: SeguimientoState = {
  isLoadingSeguimiento:false,
  isLoadingSeguimientosAgendados:false,
  seguimientosAgendados:[],
  citasPaciente:[],
  isLoadingCitasPacientes:false
};

const mainReducer = createReducer(
  initialState,
  
  on(seguimientosActions.createSeguimiento, (state) => ({
    ...state,
    isLoadingSeguimiento: true
  })),
  on(seguimientosActions.createSeguimientoSuccess, (state) => ({
    ...state,
    isLoadingSeguimiento: false
  })),
  on(seguimientosActions.createSeguimientoError, (state) => ({
    ...state,
    isLoadingSeguimiento: false
  })),
  on(seguimientosActions.agendarSeguimiento, (state) => ({
    ...state,
    isLoadingSeguimiento: true
  })),
  on(seguimientosActions.agendarSeguimientoSuccess, (state) => ({
    ...state,
    isLoadingSeguimiento: false
  })),
  on(seguimientosActions.agendarSeguimientoError, (state) => ({
    ...state,
    isLoadingUsers: false
  })),
  on(seguimientosActions.loadSeguimientosAgendados, (state) => ({
    ...state,
    isLoadingSeguimientosAgendados: true
  })),
  on(seguimientosActions.loadSeguimientosAgendadosSuccess, (state, payload) => ({
    ...state,
    isLoadingSeguimientosAgendados: false,
    seguimientosAgendados: [...payload.seguimientosAgendados]
  })),
  on(seguimientosActions.loadSeguimientosAgendadosError, (state) => ({
    ...state,
    isLoadingSeguimientosAgendados: false
  })),
  on(seguimientosActions.loadCitasPaciente, (state) => ({
    ...state,
    isLoadingCitasPacientes: true
  })),
  on(seguimientosActions.loadCitasPacienteSuccess, (state, payload) => ({
    ...state,
    isLoadingCitasPacientes: false,
    citasPaciente: [...payload.citas]
  })),
  on(seguimientosActions.loadCitasPacienteError, (state) => ({
    ...state,
    isLoadingCitasPacientes: false
  })),
);

export function reducer(state: SeguimientoState | undefined, action: Action) {
  return mainReducer(state, action);
}

// export const getMainState = (state:SeguimientoState)=> state
// export const getUserLogged = (state:SeguimientoState)=> state.isLoading
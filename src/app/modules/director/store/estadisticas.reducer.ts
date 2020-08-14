import { Action, createReducer, on } from '@ngrx/store';
import * as estadisticasActions  from './estadisticas.actions';
import { ContadoresEstadisticaOut } from '../../../core/domain/outputs';
export interface EstadisticasState {
  isLoadingTotales: boolean;
  totalesPacientes: ContadoresEstadisticaOut
}

const contadoresInit: ContadoresEstadisticaOut = {
    countPacientesPorDiaPorDiagnosticoOut:[],
    countPacientesPorDiagnostico:[],
    countUserPorRoleAndHospital:0
}

export const initialState: EstadisticasState = {
    isLoadingTotales: false,
    totalesPacientes: contadoresInit
  }
 
const estadisticasReducer = createReducer(
  initialState,
  on(estadisticasActions.loadTotalesPacientes, (state) => ({
      ...state,
      isLoadingTotales:true,
  })),
  on(estadisticasActions.loadTotalesPacientesSuccess, (state, payload) => ({
    ...state,
    totalesPacientes: payload.output,
    isLoadingMiPerfil:false
  })),
  on(estadisticasActions.loadTotalesPacientesError, state => ({
    ...state,
    isLoadingMiPerfil:false,
  })),

);

export function reducer(state: EstadisticasState | undefined, action: Action) {
  return estadisticasReducer(state, action);
}

export const selectEstadisticasState = (state: EstadisticasState) => state.totalesPacientes;
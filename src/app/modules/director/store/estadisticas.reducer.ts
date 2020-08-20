import { Action, createReducer, on, createFeatureSelector, createSelector} from '@ngrx/store';
import * as estadisticasActions  from './estadisticas.actions';
import { ContadoresEstadisticaOut, 
         CountPacientesPorDiagnosticoOut, 
         CountPacientesPorDiaPorDiagnosticoOut} from '../../../core/domain/outputs';

import { RolesUserEnum } from '../../../core/domain/enums';

export interface EstadisticasState {
  isLoadingTotales: boolean;
  isLoadingPacientesPorDiagnostico:boolean;
  isLoadingPacientesPorDiagnosticoDiario:boolean;
  isLoadingTotalDoctores:boolean;
  isLoadingTotalPacientes:boolean;
  totalesPacientes: ContadoresEstadisticaOut,
  countPacientesPorDiagnostico: CountPacientesPorDiagnosticoOut [];
  countPacientesPorDiaPorDiagnostico: CountPacientesPorDiaPorDiagnosticoOut [];
  totalDoctores:number;
  totalPacientes:number;
}

const contadoresInit: ContadoresEstadisticaOut = {
    countPacientesPorDiaPorDiagnosticoOut : [],
    countPacientesPorDiagnostico : [],
    countUserPorRoleAndHospital : 0
}

export const initialState: EstadisticasState = {
    isLoadingTotales: false,
    isLoadingPacientesPorDiagnostico: false,
    isLoadingPacientesPorDiagnosticoDiario: false,
    isLoadingTotalDoctores:false,
    isLoadingTotalPacientes:false,
    totalesPacientes: contadoresInit,
    countPacientesPorDiagnostico: [],
    countPacientesPorDiaPorDiagnostico: [],
    totalDoctores: 0,
    totalPacientes: 0
  }
 
const estadisticasReducer = createReducer(
  initialState,
  on(estadisticasActions.loadPacientesPorDiagnostico, (state) => ({
      ...state,
      isLoadingPacientesPorDiagnostico:true,
  })),
  on(estadisticasActions.loadPacientesPorDiagnosticoSuccess, (state, payload) => ({
    ...state,
    countPacientesPorDiagnostico: payload.output.countPacientesPorDiagnostico,
    isLoadingPacientesPorDiagnostico:false
  })),
  on(estadisticasActions.loadPacientesPorDiagnosticoError, state => ({
    ...state,
    isLoadingPacientesPorDiagnostico:false,
  })),

  on(estadisticasActions.loadEvolucionDiariaPacientes, (state) => ({
    ...state,
    isLoadingPacientesPorDiagnosticoDiario: true,
  })),
  on(estadisticasActions.loadEvolucionDiariaPacientesSuccess, (state, payload) => ({
    ...state,
    countPacientesPorDiaPorDiagnostico: payload.output.countPacientesPorDiaPorDiagnosticoOut,
    isLoadingPacientesPorDiagnosticoDiario: false
  })),
  on(estadisticasActions.loadEvolucionDiariaPacientesError, state => ({
    ...state,
    isLoadingPacientesPorDiagnosticoDiario: false,
  })),

  on(estadisticasActions.loadTotalUsuariosPorRol, (state, payload) => {
    if(payload.input.role === RolesUserEnum.DOCTOR)
      return {
        ...state,
        isLoadingTotalDoctores: true,
      }
    if(payload.input.role === RolesUserEnum.PACIENTE)
      return {
        ...state,
        isLoadingTotalPacientes: true
      }
  }),
  on(estadisticasActions.loadTotalUsuariosPorRolSuccess, (state, payload) => {
    if(payload.role === RolesUserEnum.DOCTOR)
      return {
        ...state,
        isLoadingTotalDoctores: false,
        totalDoctores: payload.output.countUserPorRoleAndHospital
      }
    if(payload.role === RolesUserEnum.PACIENTE)
      return {
        ...state,
        isLoadingTotalPacientes: false,
        totalPacientes: payload.output.countUserPorRoleAndHospital
      }
  }),
  on(estadisticasActions.loadTotalUsuariosPorRolError, (state, payload) => {
    if(payload.role === RolesUserEnum.DOCTOR)
      return {
        ...state,
        isLoadingTotalDoctores: false,
      }
    if(payload.role === RolesUserEnum.PACIENTE)
      return {
        ...state,
        isLoadingTotalPacientes: false,
      }
  }),
  

);

export function reducer(state: EstadisticasState | undefined, action: Action) {
  return estadisticasReducer(state, action);
}

export const selectEstadisticasState = createFeatureSelector<EstadisticasState>('estadisticas');

export const selectCountPacientesPorDiagnostico = createSelector(selectEstadisticasState, (state) => state.countPacientesPorDiagnostico);
export const selectContPacientesPorDiagnosticoDiario = createSelector(selectEstadisticasState, 
                                                            (state) => state.countPacientesPorDiaPorDiagnostico);
export const selectIsloadingCountPacientesPorDiagnostico = createSelector(selectEstadisticasState,
                                                            (state) => state.isLoadingPacientesPorDiagnostico);
export const selectIsloadingCountPacientesPorDiagnosticoDiario = createSelector(selectEstadisticasState, 
                                                            (state) => state.isLoadingPacientesPorDiagnosticoDiario);
export const selectTotalPacientes = createSelector(selectEstadisticasState, (state) => state.totalPacientes);
export const selectTotalDoctores = createSelector(selectEstadisticasState, (state) => state.totalDoctores);

import { createAction, props } from '@ngrx/store';
import { ContadoresEstadisticaIn } from '../../../core/domain/inputs';
import { ContadoresEstadisticaOut } from '../../../core/domain/outputs';

export const loadTotalesPacientes = createAction(
  '[Estadisticas] Load Totales Pacientes',
  props<{input: ContadoresEstadisticaIn }>()
)

export const loadTotalesPacientesSuccess = createAction(
  '[Estadisticas] Load Totales Pacientes Success',
  props<{ output: ContadoresEstadisticaOut }>()
)

export const loadTotalesPacientesError = createAction(
  '[Estadisticas] Load Totales Pacientes Error',
  props<{ error }>()
)





import { createAction, props } from '@ngrx/store';
import { ContadoresEstadisticaIn, MapasDatosIn } from '../../../core/domain/inputs';
import { ContadoresEstadisticaOut, MapasDatosOut } from '../../../core/domain/outputs';
import { RolesUserEnum } from '../../../core/domain/enums';

export const loadTotalUsuariosPorRol = createAction(
  '[Estadisticas] Load Total Usuarios Por Rol',
  props<{input: ContadoresEstadisticaIn }>()
)

export const loadTotalUsuariosPorRolSuccess = createAction(
  '[Estadisticas] Load Total Usuarios Por Rol Success',
  props<{ output: ContadoresEstadisticaOut, role: RolesUserEnum }>()
)

export const loadTotalUsuariosPorRolError = createAction(
  '[Estadisticas] Load Total Usuarios Por Rol Error',
  props<{ error, role: RolesUserEnum }>()
)

export const loadEvolucionDiariaPacientes = createAction(
  '[Estadisticas] Load Evolucion Diaria Pacientes',
  props<{input: ContadoresEstadisticaIn }>()
)

export const loadEvolucionDiariaPacientesSuccess = createAction(
  '[Estadisticas] Load Evolucion Diaria Success',
  props<{ output: ContadoresEstadisticaOut }>()
)

export const loadEvolucionDiariaPacientesError = createAction(
  '[Estadisticas] Load Evolucion Diaria Error',
  props<{ error }>()
)

export const loadPacientesPorDiagnostico = createAction(
  '[Estadisticas] Load Pacientes Por Diagnostico',
  props<{input: ContadoresEstadisticaIn }>()
)

export const loadPacientesPorDiagnosticoSuccess = createAction(
  '[Estadisticas] Load Pacientes Por Diagnostico Success',
  props<{ output: ContadoresEstadisticaOut }>()
)

export const loadPacientesPorDiagnosticoError = createAction(
  '[Estadisticas] Load Pacientes Por Diagnostico Error',
  props<{ error }>()
)

export const loadCoordenadasPorDiagnostico = createAction(
  '[Estadisticas] Load coordenadas Por Diagnostico',
  props<{input: MapasDatosIn }>()
)

export const loadCoordenadasPorDiagnosticoSuccess = createAction(
  '[Estadisticas] Load coordenadas Por Diagnostico Success',
  props<{ output: MapasDatosOut }>()
)

export const loadCoordenadasPorDiagnosticoError = createAction(
  '[Estadisticas] Load coordenadas Por Diagnostico Error',
  props<{ error }>()
)

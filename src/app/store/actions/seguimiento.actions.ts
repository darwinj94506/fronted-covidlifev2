import { createAction, props } from '@ngrx/store';
import { SolicitarSeguimientoOut, AtenderSolicitudSeguimientoOut, AgendarSolicitudSeguimientoOut, FiltrarSeguimientoOut } from '../../core/domain/outputs';
import { SolicitarSeguimientoIn, AtenderSolicitudSeguimientoIn, AgendarSolicitudSeguimientoIn, FiltrarSeguimientoIn } from '../../core/domain/inputs';

export const createSeguimiento = createAction(
  '[Seguimiento] Create Seguimiento',
  props<{ seguimientoIn: SolicitarSeguimientoIn }>()
)

export const createSeguimientoSuccess = createAction(
  '[Seguimiento] Create Seguimiento Success',
  props<{ seguimientoOut: SolicitarSeguimientoOut }>()
)

export const createSeguimientoError = createAction(
  '[Seguimiento] Create Seguimiento Error',
  props<{ error: String }>()
)

export const atenderSeguimiento = createAction(
  '[Seguimiento] Atender Seguimiento',
  props<{ seguimiento: AtenderSolicitudSeguimientoIn }>()
)

export const atenderSeguimientoSuccess = createAction(
  '[Seguimiento] Atender Seguimiento Success',
  props<{ attendedSeguimiento: AtenderSolicitudSeguimientoOut }>()
)

export const atenderSeguimientoError = createAction(
  '[Seguimiento] Atender Seguimiento Error',
  props<{ error: String }>()
)

export const agendarSeguimiento = createAction(
  '[Seguimiento] Agendar Seguimiento',
  props<{ seguimiento: AgendarSolicitudSeguimientoIn, tokenMovil?:String }>()
)

export const agendarSeguimientoSuccess = createAction(
  '[Seguimiento] Agendar Seguimiento Success',
  props<{ scheduledSeguimiento: AgendarSolicitudSeguimientoOut, tokenMovil?:String }>()
)

export const agendarSeguimientoError = createAction(
  '[Seguimiento] Agendar Seguimiento Error',
  props<{ error: String }>()
)

export const sendNotificationAgendado = createAction(
  '[Seguimiento] Send Notification Agendado',
  props<{ tokenMovil?:String }>()
)

export const sendNotificationAgendadoSuccess = createAction(
  '[Seguimiento] Send Notification Success',
  props<{ msg }>()
)

export const sendNotificationAgendadoError = createAction(
  '[Seguimiento] Send Notification Error',
  props<{ error }>()
)



export const loadSeguimientosAgendados = createAction(
  '[Seguimiento] Load Seguimientos Agendados'
)

export const loadSeguimientosAgendadosSuccess = createAction(
  '[Seguimiento] Load Seguimientos Agendados Success',
  props<{ seguimientosAgendados: FiltrarSeguimientoOut [] }>()
)

export const loadSeguimientosAgendadosError = createAction(
  '[Seguimiento] Load Seguimientos Agendados Error',
  props<{ error: String }>()
)

export const loadCitasPaciente = createAction(
  '[Seguimiento] Load Citas Pacientes',
  props<{ filter: FiltrarSeguimientoIn }>()
)

export const loadCitasPacienteSuccess = createAction(
  '[Seguimiento] Load Citas Pacientes Success',
  props<{ citas: FiltrarSeguimientoOut [] }>()
)

export const loadCitasPacienteError = createAction(
  '[Seguimiento] Load Citas Pacientes Error',
  props<{ error: String }>()
)

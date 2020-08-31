import { createAction, props } from '@ngrx/store';
import { SolicitarSeguimientoOut, 
    AtenderSolicitudSeguimientoOut,
    AgendarSolicitudSeguimientoOut, 
    FiltrarSeguimientoOut, LoginOut,
    CrearNotificacionOut,
    EditarSeguimientoOut,
    SeguimientoCompletoPacienteOut} from '../../core/domain/outputs';
import { SolicitarSeguimientoIn, 
  AtenderSolicitudSeguimientoIn,
  SeguimientoCompletoPacienteIn, 
  AgendarSolicitudSeguimientoIn,
  CrearNotificacionIn, 
  EditarSeguimientoIn,
  FiltrarSeguimientoIn } from '../../core/domain/inputs';
  import { SeguimientoEstadoEnum } from '../../core/domain/enums';

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

export const updateSeguimiento = createAction(
  '[Seguimiento] Update Seguimiento',
  props<{ seguimiento: EditarSeguimientoIn }>()
)

export const updateSeguimientoSuccess = createAction(
  '[Seguimiento] Update Seguimiento Success',
  props<{ seguimiento: EditarSeguimientoOut }>()
)

export const updateSeguimientoError = createAction(
  '[Seguimiento] Update Seguimiento Error',
  props<{ error }>()
)

export const atenderSeguimiento = createAction(
  '[Seguimiento] Atender Seguimiento',
  props<{ seguimiento: AtenderSolicitudSeguimientoIn, estado: SeguimientoEstadoEnum}>()
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
  props<{ seguimiento: FiltrarSeguimientoOut, doctor?: LoginOut }>()
)

export const agendarSeguimientoSuccess = createAction(
  '[Seguimiento] Agendar Seguimiento Success',
  props<{ scheduledSeguimiento: AgendarSolicitudSeguimientoOut, seguimiento:FiltrarSeguimientoOut, doctor?:LoginOut }>()
)

export const agendarSeguimientoError = createAction(
  '[Seguimiento] Agendar Seguimiento Error',
  props<{ error: String }>()
)

export const sendNotificationVideoLlamada = createAction(
  '[Seguimiento] Send Notification Video Llamada',
  props<{ seguimiento: FiltrarSeguimientoOut, doctor?:LoginOut, notification: CrearNotificacionIn}>()
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


export const loadSeguimientosCompletos = createAction(
  '[Seguimiento] Load Seguimientos Completos',
  props<{ params: SeguimientoCompletoPacienteIn }>()
)

export const loadSeguimientosCompletosSuccess = createAction(
  '[Seguimiento] Load Seguimientos Completos Success',
  props<{ seguimientos: SeguimientoCompletoPacienteOut [] }>()
)

export const loadSeguimientosCompletosError = createAction(
  '[Seguimiento] Load Seguimientos Completos Error',
  props<{ error: String }>()
)

export const createNotification = createAction(
  '[Seguimiento] Create Notification',
  props<{ notification: CrearNotificacionIn }>()
)

export const createNotificationSuccess = createAction(
  '[Seguimiento] Create Notification Success',
  props<{ notification: CrearNotificacionOut }>()
)

export const createNotificationError = createAction(
  '[Seguimiento] Create Notification Error',
  props<{ error }>()
)

export const sendPushNotification = createAction(
  '[Seguimiento] Send Push Notification',
  props<{ seguimiento: FiltrarSeguimientoOut, doctor?:LoginOut, notificacion: CrearNotificacionIn}>()
)

export const sendPushNotificationSuccess = createAction(
  '[Seguimiento] Send Push Notification Success',
  props<{ msg }>()
)

export const sendPushNotificationError = createAction(
  '[Seguimiento] Send Push Notification Error',
  props<{ error }>()
)
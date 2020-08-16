import { NotificacionEstadoEnum, EmisorNotRecibOut, ReceptorNotRecibOut } from '../enums';
export interface ObtenerNotificacionesRecibidasOut {
    _id?: String;
    titulo: String;
    descripcion: String;
    idSeguimiento?: String;
    idEmisor: EmisorNotRecibOut;
    idReceptor: ReceptorNotRecibOut;
    vistaEn?: Date;
    estadoNotificacion: NotificacionEstadoEnum;
    fechaCambioUltimoEstado: Date;
    createAt: Date;
}
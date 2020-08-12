import { NotificacionEstadoEnum } from '../enums';
export interface CrearNotificacionOut {
    _id: String;
    titulo: String;
    descripcion: String;
    idSeguimiento?: String;
    idEmisor: String;
    idReceptor: String;
    vistaEn: Date;
    estadoNotificacion: NotificacionEstadoEnum;
    fechaCambioUltimoEstado: Date;
    createAt: Date;
}
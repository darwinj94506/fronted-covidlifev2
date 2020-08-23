import { NotificacionEstadoEnum } from '../enums';
import { EmisorNotRecibOut } from './emisor-not-recib-out';
import { ReceptorNotRecibOut } from './receptor-not-recib-out';
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
    body: any;
}




import { NotificacionEstadoEnum } from '../enums';
import { EmisorNotEnvOut } from './emisor-not-env.out';
import { ReceptorNotEnvOut } from './receptor-not-env.out';
export interface ObtenerNotificacionesEnviadasOut {
    _id?: String;
    titulo: String;
    descripcion: String;
    idSeguimiento?: String;
    idEmisor: EmisorNotEnvOut;
    idReceptor: ReceptorNotEnvOut;
    vistaEn?: Date;
    estadoNotificacion: NotificacionEstadoEnum;
    fechaCambioUltimoEstado: Date;
    createAt: Date;
    body?: Object;
}
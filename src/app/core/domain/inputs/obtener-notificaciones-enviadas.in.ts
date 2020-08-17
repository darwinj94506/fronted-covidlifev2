import { NotificacionEstadoEnum } from '../enums';
export interface  ObtenerNotificacionesEnviadasIn {
    andId?: String;
    andLikeTitulo?: String
    andLikeDescripcion?: String
    andIdSeguimiento?: String;
    andIdReceptor?: String
    andVistaEn?: Date;
    andCreateAt?: Date;
    andEstadoNotificacion?: NotificacionEstadoEnum
    }
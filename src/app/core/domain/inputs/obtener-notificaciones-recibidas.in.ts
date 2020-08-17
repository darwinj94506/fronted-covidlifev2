import { NotificacionEstadoEnum } from '../enums';
export interface ObtenerNotificacionesRecibidasIn {
    andId?: String;
    andLikeTitulo?: String;
    andLikeDescripcion?: String;
    andIdSeguimiento?: String;
    andIdEmisor?: String;
    andVistaEn?: Date;
    andCreateAt?: Date;
    andEstadoNotificacion?: NotificacionEstadoEnum;
}
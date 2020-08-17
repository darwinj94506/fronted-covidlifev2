import { EmisorConsulNotOut } from './emisor-consul-not.out';
import { SeguimientoConsulNotOut } from './seguimiento-consult-not.out';
import { ReceptorConsulNotOut } from './receptor-consul-not.out';
import { NotificacionEstadoEnum } from '../enums';
export interface ConsultarUnaNotificacionOut{
    _id?: String;
    titulo: String;
    descripcion: String;
    idSeguimiento?: SeguimientoConsulNotOut;
    idEmisor: EmisorConsulNotOut;
    idReceptor: ReceptorConsulNotOut;
    vistaEn?: Date;
    estadoNotificacion: NotificacionEstadoEnum;
    fechaCambioUltimoEstado: Date;
    createAt: Date;
}
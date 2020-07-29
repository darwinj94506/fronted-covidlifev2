import { UserMotivoAltaEnum } from '../enums';
export interface VOMotivoAlta {
    fecha: Date;
    idUserDaMotivoAlta: String;
    motivo: UserMotivoAltaEnum;
}
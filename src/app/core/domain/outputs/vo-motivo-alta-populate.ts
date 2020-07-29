import { UserMotivoAltaEnum } from '../enums'
export interface VOMotivoAltaPopulate {
    fecha: Date;
    idUserDaMotivoAlta: String;
    motivo: UserMotivoAltaEnum;
    }
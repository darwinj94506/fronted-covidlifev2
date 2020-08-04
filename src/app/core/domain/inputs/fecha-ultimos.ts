import { SeguimientoEstadoEnum } from '../enums'
export interface FechaUltimos {
    isUltimos: Boolean;
    createAt: Date;
    AndIdHospital?: String;
    AndIdDoctor?: String;
    AndEstado?: SeguimientoEstadoEnum;   
 }
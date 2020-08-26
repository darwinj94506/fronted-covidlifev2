import { SeguimientoEstadoEnum } from '../enums'
export interface FechaUltimos {
    isUltimos: Boolean;
    createAt: Date;
    AndIdHospital?: String;
    AndIdDoctor?: String;
    AndIdPaciente?: String;
    AndEstado?: SeguimientoEstadoEnum;   

 }
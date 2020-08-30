import { EstadisticaTipoEnum, RolesUserEnum } from '../enums';
export interface ContadoresEstadisticaIn {
    tipo: EstadisticaTipoEnum;
    idHospital: String;
    role?: RolesUserEnum;
    idEspacioPadre?: String;
    
}

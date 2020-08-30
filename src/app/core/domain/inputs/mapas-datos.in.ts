import { EstadisticaTipoEnum, RolesUserEnum } from '../enums';
export interface  MapasDatosIn {
    tipo: EstadisticaTipoEnum;
    idHospital: String;
    idEspacioPadre?: String;
    role?: RolesUserEnum;
}
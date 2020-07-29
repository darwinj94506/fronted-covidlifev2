import { EstadoEntidadEnum } from '../enums';
export interface HospitalConsulUnSegOut {
    _id: String;
    nombre: String;
    descripcion?: String;
    idEspacio: String;
    estado_entidad: EstadoEntidadEnum;
    }
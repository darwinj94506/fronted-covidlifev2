import { EstadoEntidadEnum } from '../enums';
export interface HospitalSegCompOut {
    _id: String;
    nombre: String;
    descripcion?: String;
    idEspacio: String;
    estado_entidad: EstadoEntidadEnum;
    }
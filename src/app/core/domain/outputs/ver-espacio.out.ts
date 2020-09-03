import { EspacioEnum, EstadoEntidadEnum } from '../enums';
export interface  VerEspacioOut {
    _id?: String;
    nombre: String;
    descripcion?: String;
    tipo?: EspacioEnum;
    idEspacio?: String;
    latitud?: String;
    longitud?: String;
    estado_entidad?: EstadoEntidadEnum;
}
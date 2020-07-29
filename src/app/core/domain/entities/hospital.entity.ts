import { IEntity  } from './entity';
export interface IHospitalEntity extends IEntity{
    nombre: String;
    descripcion?: String;
    idEspacio: String;
    estado_entidad?: number;
}





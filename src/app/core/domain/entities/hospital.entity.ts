import { IEntity  } from './entity';
export interface IHospitalEntity extends IEntity{
    nombre: String;
    description?: String;
    idEspacio: String;
    estado_entidad?: number;
}





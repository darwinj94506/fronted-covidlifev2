import { IEntity  } from './entity';
import { EspacioEnum } from '../enums';
export interface IEspacioEntity extends IEntity{
    nombre: string;
    descripcion?: string;
    tipo:EspacioEnum;
    idEspacio?: string;
    latitud?: string;
    longitud?: string;
}
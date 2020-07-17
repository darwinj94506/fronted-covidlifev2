import { GenericRepository } from './generic-repository';
import { IEspacioEntity } from '../domain/entities';
import { EspacioEnum } from '../domain/enums';
export abstract class EspacioRepositorio extends GenericRepository<IEspacioEntity> {
    abstract getPorTipo_Y_IdEspacio( tipo:EspacioEnum, id:string | number) : any 
    abstract getProvincias() : any
}
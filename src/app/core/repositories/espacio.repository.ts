import { GenericRepository } from './generic-repository';
import { IEspacioEntity } from '../domain/entities';
import { FilterEspaceIn } from '../domain/inputs';
export abstract class EspacioRepositorio extends GenericRepository<IEspacioEntity> {

    abstract getPorTipo_O_IdPadre( filter: FilterEspaceIn ) : any 
}


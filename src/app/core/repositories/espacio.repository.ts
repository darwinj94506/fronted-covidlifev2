import { GenericRepository } from './generic-repository';
import { IEspacioEntity } from '../domain/entities';
import { FilterEspaceIn, VerEspacioIn } from '../domain/inputs';
import { VerEspacioOut } from '../domain/outputs';
import { Observable } from 'rxjs'
export abstract class EspacioRepositorio extends GenericRepository<IEspacioEntity> {

    abstract getPorTipo_O_IdPadre( filter: FilterEspaceIn ) : any
    abstract verDetalleEspacio(filter: VerEspacioIn): Observable<VerEspacioOut>; 
}


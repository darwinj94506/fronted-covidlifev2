import { GenericRepository } from './generic-repository';
import { IEntity } from '../domain/entities';
import { SeguimientoEstadoEnum, SeguimientoTipoEnum } from '../domain/enums';
import { ContadoresEstadisticaIn } from '../domain/inputs';
import { ContadoresEstadisticaOut } from '../domain/outputs';
import { Observable } from 'rxjs';

export abstract class EstadisticasRepository extends GenericRepository<IEntity> {
    
    abstract getCountStatistics(contadoresIn: ContadoresEstadisticaIn): Observable<ContadoresEstadisticaOut>
     
}
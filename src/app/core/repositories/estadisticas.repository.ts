import { GenericRepository } from './generic-repository';
import { IEntity } from '../domain/entities';
import { SeguimientoEstadoEnum, SeguimientoTipoEnum } from '../domain/enums';
import { ContadoresEstadisticaIn, MapasDatosIn } from '../domain/inputs';
import { ContadoresEstadisticaOut, MapasDatosOut } from '../domain/outputs';
import { Observable } from 'rxjs';

export abstract class EstadisticasRepository extends GenericRepository<IEntity> {
    abstract getCountStatistics(contadoresIn: ContadoresEstadisticaIn): Observable<ContadoresEstadisticaOut>
    abstract getEstadisticasMapas(filter: MapasDatosIn): Observable<MapasDatosOut>
}
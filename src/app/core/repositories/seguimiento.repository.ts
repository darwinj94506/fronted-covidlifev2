import { GenericRepository } from './generic-repository';
import { ISeguimientoEntity, } from '../domain/entities';
import { SeguimientoEstadoEnum, SeguimientoTipoEnum} from '../domain/enums';
export abstract class SeguimientoRepositorio extends GenericRepository<ISeguimientoEntity> {
    
    abstract getSeguimientosPorEstado(state: SeguimientoEstadoEnum): any
    abstract getSeguimientosAtendidos(): any

}
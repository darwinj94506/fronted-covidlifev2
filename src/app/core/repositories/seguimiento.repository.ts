import { GenericRepository } from './generic-repository';
import { ISeguimientoEntity, } from '../domain/entities';
import { SeguimientoEstadoEnum, SeguimientoTipoEnum } from '../domain/enums';
import { SolicitarSeguimientoIn, ConsultarUnSeguimientoIn } from '../domain/inputs';
import { SolicitarSeguimientoOut, ConsultarUnSeguimientoOut} from '../domain/outputs';

import { Observable } from 'rxjs';

export abstract class SeguimientoRepositorio extends GenericRepository<ISeguimientoEntity> {
    
    abstract getSeguimientosPorEstado(state: SeguimientoEstadoEnum): any
    abstract getSeguimientosAtendidos(): any
    abstract createSeguimiento(seguimiento: SolicitarSeguimientoIn) : Observable<SolicitarSeguimientoOut>;
    abstract getSeguimientoById(idSeguimiento : ConsultarUnSeguimientoIn): Observable<ConsultarUnSeguimientoOut>;
    abstract seguimientoSubscription(): Observable<ConsultarUnSeguimientoOut>;
    
}
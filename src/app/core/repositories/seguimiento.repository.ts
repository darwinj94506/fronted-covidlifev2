import { GenericRepository } from './generic-repository';
import { ISeguimientoEntity, } from '../domain/entities';
import { SeguimientoEstadoEnum, SeguimientoTipoEnum } from '../domain/enums';
import { SolicitarSeguimientoIn, ConsultarUnSeguimientoIn, FiltrarSeguimientoIn,
         AtenderSolicitudSeguimientoIn, AgendarSolicitudSeguimientoIn, SeguimientoCompletoPacienteIn, CrearNotificacionIn } from '../domain/inputs';
import { SolicitarSeguimientoOut, ConsultarUnSeguimientoOut, SeguimientoCompletoPacienteOut, CrearNotificacionOut,
         FiltrarSeguimientoOut, AtenderSolicitudSeguimientoOut, AgendarSolicitudSeguimientoOut } from '../domain/outputs';

import { Observable } from 'rxjs';

export abstract class SeguimientoRepositorio extends GenericRepository<ISeguimientoEntity> {
    
    abstract getSeguimientosPorEstado(state: SeguimientoEstadoEnum): any
    abstract getSeguimientosAtendidos(): any
    abstract createSeguimiento(seguimiento: SolicitarSeguimientoIn) : Observable<SolicitarSeguimientoOut>;
    abstract getSeguimientoById(idSeguimiento : ConsultarUnSeguimientoIn): Observable<ConsultarUnSeguimientoOut>;
    abstract filterSeguimiento(filter: FiltrarSeguimientoIn): Observable<FiltrarSeguimientoOut[]>;
    // abstract suscriptionSeguimiento():  Observable<ConsultarUnSeguimientoOut>;
    abstract suscriptionSeguimiento(filter: FiltrarSeguimientoIn): any;
    abstract atenderSeguimiento(seguimiento: AtenderSolicitudSeguimientoIn):Observable<AtenderSolicitudSeguimientoOut>;
    abstract agendarSeguimiento(seguimiento: AgendarSolicitudSeguimientoIn):Observable<AgendarSolicitudSeguimientoOut>;
    abstract getResumenSeguimientosPaciente(data: SeguimientoCompletoPacienteIn):Observable<SeguimientoCompletoPacienteOut []>;
    abstract createNotification(data: CrearNotificacionIn):Observable<CrearNotificacionOut>;
    
}
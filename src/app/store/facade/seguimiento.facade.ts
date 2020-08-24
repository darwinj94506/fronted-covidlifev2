import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as seguimientoActions from '../actions/seguimiento.actions';
import { SolicitarSeguimientoIn, 
         AtenderSolicitudSeguimientoIn,
         FiltrarSeguimientoIn,
         SeguimientoCompletoPacienteIn, 
         CrearNotificacionIn } from '../../core/domain/inputs';
import { FiltrarSeguimientoOut, 
         LoginOut, 
         SeguimientoCompletoPacienteOut } from '../../core/domain/outputs';
import { AppState, 
         selectSeguimientosAgendados, 
         selectCitasPacientes, 
         selectIsLoadingSeguimientosCompletos, 
         selectSeguimientosCompletos }from '../app.reducer';
import { SeguimientoEstadoEnum} from '../../core/domain/enums';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SeguimientoFacade {
  constructor(private store: Store<AppState>) {}

  createSeguimiento(seguimientoIn: SolicitarSeguimientoIn): void {
    this.store.dispatch(seguimientoActions.createSeguimiento({seguimientoIn}))
  }

  atenderSeguimiento(seguimiento: AtenderSolicitudSeguimientoIn, estado: SeguimientoEstadoEnum): void {
    this.store.dispatch(seguimientoActions.atenderSeguimiento({seguimiento, estado}))
  }

  agendarSeguimiento(seguimiento: FiltrarSeguimientoOut, doctor:LoginOut): void {
    this.store.dispatch(seguimientoActions.agendarSeguimiento({seguimiento, doctor}))
  }

  getSeguimientosAgendadosStore():Observable<FiltrarSeguimientoOut[]>{
    return this.store.select(selectSeguimientosAgendados)
  }

  loadSeguimientosAgendados(): void{
    this.store.dispatch(seguimientoActions.loadSeguimientosAgendados())
  }

  dispatchActionLoadCitas(filter: FiltrarSeguimientoIn):void{
    this.store.dispatch(seguimientoActions.loadCitasPaciente({filter}))
  } 

  dispatchActionSendNotificationVideoLlamada(seguimiento:FiltrarSeguimientoOut, doctor:LoginOut, notification: CrearNotificacionIn):void{
    this.store.dispatch(seguimientoActions.sendNotificationVideoLlamada({seguimiento, doctor, notification}))
  } 

  getCitasPacienteFromStore():Observable<FiltrarSeguimientoOut[]>{
    return this.store.select(selectCitasPacientes)
  }

  getSeguimientosCompletosFromStore():Observable<SeguimientoCompletoPacienteOut[]>{
    return this.store.select(selectSeguimientosCompletos)
  }

  getIsLoadingSeguimientosCompletosFromStore():Observable<boolean>{
    return this.store.select(selectIsLoadingSeguimientosCompletos)
  }

  dispatchActionLoadSeguimientosCompletos(params: SeguimientoCompletoPacienteIn):void{
    this.store.dispatch(seguimientoActions.loadSeguimientosCompletos({params}))
  } 
}
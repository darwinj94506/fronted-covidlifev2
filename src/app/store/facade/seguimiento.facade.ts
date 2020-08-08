import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as seguimientoActions from '../actions/seguimiento.actions';
import { SolicitarSeguimientoIn, AtenderSolicitudSeguimientoIn, AgendarSolicitudSeguimientoIn, FiltrarSeguimientoIn } from '../../core/domain/inputs';
import { FiltrarSeguimientoOut } from '../../core/domain/outputs';
import { AppState, selectSeguimientosAgendados, selectCitasPacientes }from '../app.reducer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SeguimientoFacade {
  constructor(private store: Store<AppState>) {}

  createSeguimiento(seguimientoIn: SolicitarSeguimientoIn): void {
    this.store.dispatch(seguimientoActions.createSeguimiento({seguimientoIn}))
  }

  atenderSeguimiento(seguimiento: AtenderSolicitudSeguimientoIn): void {
    this.store.dispatch(seguimientoActions.atenderSeguimiento({seguimiento}))
  }

  agendarSeguimiento(seguimiento: AgendarSolicitudSeguimientoIn, tokenMovil?:string): void {
    this.store.dispatch(seguimientoActions.agendarSeguimiento({seguimiento, tokenMovil}))
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

  dispatchActionSendNotificationVideoLlamada(tokenMovil:String, idSeguimiento:String):void{
    this.store.dispatch(seguimientoActions.sendNotificationVideoLlamada({tokenMovil, idSeguimiento}))
  } 

  getCitasPacienteFromStore():Observable<FiltrarSeguimientoOut[]>{
    return this.store.select(selectCitasPacientes)
  }
}
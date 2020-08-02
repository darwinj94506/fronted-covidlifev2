import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as seguimientoActions from '../actions/seguimiento.actions';
import { SolicitarSeguimientoIn, AtenderSolicitudSeguimientoIn, AgendarSolicitudSeguimientoIn } from '../../core/domain/inputs';
import { FiltrarSeguimientoOut } from '../../core/domain/outputs';
import { AppState, selectSeguimientosAgendados }from '../app.reducer';
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

  agendarSeguimiento(seguimiento: AgendarSolicitudSeguimientoIn): void {
    this.store.dispatch(seguimientoActions.agendarSeguimiento({seguimiento}))
  }

  getSeguimientosAgendadosStore():Observable<FiltrarSeguimientoOut[]>{
    return this.store.select(selectSeguimientosAgendados)
  }

  loadSeguimientosAgendados(): void{
    this.store.dispatch(seguimientoActions.loadSeguimientosAgendados())
  }

 
}
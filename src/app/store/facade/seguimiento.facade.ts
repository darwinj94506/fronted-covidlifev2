import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as seguimientoActions from '../actions/seguimiento.actions';
import { SolicitarSeguimientoIn } from '../../core/domain/inputs';
import { AppState }from '../app.reducer';
         
@Injectable({
  providedIn: 'root'
})

export class SeguimientoFacade {
  constructor(private store: Store<AppState>) {}

  createSeguimiento(seguimientoIn: SolicitarSeguimientoIn):void{
    this.store.dispatch(seguimientoActions.createSeguimiento({seguimientoIn}))
  }
 
}
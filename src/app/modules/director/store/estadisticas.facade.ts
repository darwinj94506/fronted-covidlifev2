import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as estadisticasActions from './estadisticas.actions';
import { ContadoresEstadisticaIn } from '../../../core/domain/inputs';
import { ContadoresEstadisticaOut } from '../../../core/domain/outputs';
import { EstadisticasState, selectEstadisticasState } from './estadisticas.reducer';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class EstadisticasFacade {
  constructor(private store: Store<EstadisticasState>) {}

  distpachActionLoadTotalesPacientes(input: ContadoresEstadisticaIn){
    this.store.dispatch(estadisticasActions.loadTotalesPacientes({input}))
  }

  getTotalEstadisticasFromStorage(): Observable<ContadoresEstadisticaOut>{
    return this.store.select(selectEstadisticasState)
  }

}
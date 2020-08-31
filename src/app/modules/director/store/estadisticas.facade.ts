import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as estadisticasActions from './estadisticas.actions';
import { ContadoresEstadisticaIn, MapasDatosIn } from '../../../core/domain/inputs';
import { CountPacientesPorDiaPorDiagnosticoOut,
         MapasDatosOut, 
         CountPacientesPorDiagnosticoOut } from '../../../core/domain/outputs';
import { EstadisticasState, 
         selectContPacientesPorDiagnosticoDiario, 
         selectCountPacientesPorDiagnostico,
         selectIsloadingCountPacientesPorDiagnostico,
         selectIsloadingCountPacientesPorDiagnosticoDiario,
         selectTotalDoctores,
         selectTotalPacientes,
         selectCoordenasPorDiagnostico,
         selectIsLoadingCoordenasPorDiagnostico
        } from './estadisticas.reducer';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class EstadisticasFacade {
  constructor(private store: Store<EstadisticasState>) {}

  getCountPacientesPorDiagnosticoDiarioFromStorage(): Observable<CountPacientesPorDiaPorDiagnosticoOut[]>{
    return this.store.select(selectContPacientesPorDiagnosticoDiario)
  }

  distpachActionLoadEvolucionDiariaPacientes(input: ContadoresEstadisticaIn){
    this.store.dispatch(estadisticasActions.loadEvolucionDiariaPacientes({input}))
  }

  getCountPacientesPorDiagnosticoFromStorage(): Observable<CountPacientesPorDiagnosticoOut[]>{
    return this.store.select(selectCountPacientesPorDiagnostico)
  }

  distpachActionLoadPacientesPorDiagnostico(input: ContadoresEstadisticaIn){
    this.store.dispatch(estadisticasActions.loadPacientesPorDiagnostico({input}))
  }

  getIsloadingCountDiagnoticoDiarioFromStorage():Observable<boolean>{
    return this.store.select(selectIsloadingCountPacientesPorDiagnosticoDiario)
  }

  getIsloadingCountDiagnoticoFromStorage():Observable<boolean>{
    return this.store.select(selectIsloadingCountPacientesPorDiagnostico)
  }

  distpachActionLoadUsuariosPorRol(input: ContadoresEstadisticaIn){
    this.store.dispatch(estadisticasActions.loadTotalUsuariosPorRol({input}))
  }

  getTotalPacientesFromStorage():Observable<number>{
    return this.store.select(selectTotalPacientes)
  }
  
  getTotalDoctoresFromStorage():Observable<number>{
    return this.store.select(selectTotalDoctores)
  }

  getIsLoadingCoordenadasPorDiagnosticoFromStorage():Observable<boolean>{
    return this.store.select(selectIsLoadingCoordenasPorDiagnostico)
  }
  
  getCoordenadasPorDiagnosticoFromStorage():Observable<MapasDatosOut>{
    return this.store.select(selectCoordenasPorDiagnostico)
  }

  distpachActionLoadCoordenadasPorDiagnostico(input: MapasDatosIn){
    this.store.dispatch(estadisticasActions.loadCoordenadasPorDiagnostico({input}))
  }
}
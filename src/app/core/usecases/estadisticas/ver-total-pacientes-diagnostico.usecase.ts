import { Injectable } from '@angular/core';
import { EstadisticasRepository } from '../../repositories';
import { UseCase } from '../../base/use-case';
import { ContadoresEstadisticaIn } from '../../domain/inputs';
import { ContadoresEstadisticaOut } from '../../domain/outputs';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class VerTotalPacientesDiagnosticoUseCase implements UseCase<ContadoresEstadisticaIn, ContadoresEstadisticaOut> {
  constructor(private _estRepo: EstadisticasRepository) { }

  execute(params: ContadoresEstadisticaIn ): Observable<ContadoresEstadisticaOut> {    
    return this._estRepo.getCountPacientes(params)
  }
}

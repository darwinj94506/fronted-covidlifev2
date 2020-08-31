import { Injectable } from '@angular/core';
import { EstadisticasRepository } from '../../repositories';
import { UseCase } from '../../base/use-case';
import { MapasDatosIn } from '../../domain/inputs';
import { MapasDatosOut } from '../../domain/outputs';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class VerCoordenasPorDiagnosticoUseCase implements UseCase<MapasDatosIn, MapasDatosOut> {
  constructor(private _estRepo: EstadisticasRepository) { }

  execute(params: MapasDatosIn ): Observable<MapasDatosOut> {    
    return this._estRepo.getEstadisticasMapas(params)
  }
}

import { Injectable } from '@angular/core';
import { SeguimientoRepositorio } from '../../repositories';
import { UseCase } from '../../base/use-case';
import { FiltrarSeguimientoOut } from '../../domain/outputs';
import { FiltrarSeguimientoIn } from '../../domain/inputs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GetSuscriptionSeguimientosUseCase implements UseCase<FiltrarSeguimientoIn, any> {
  
  constructor(private _segRepositorio: SeguimientoRepositorio) { }
  
  execute(filter: FiltrarSeguimientoIn) {
    return this._segRepositorio.suscriptionSeguimiento(filter)
  }

}
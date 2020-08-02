import { Injectable } from '@angular/core';
import { SeguimientoRepositorio } from '../../repositories';
import { UseCase } from '../../base/use-case';
import { FiltrarSeguimientoOut } from '../../domain/outputs';
import { FiltrarSeguimientoIn } from '../../domain/inputs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VerSeguimientosUseCase implements UseCase<FiltrarSeguimientoIn, FiltrarSeguimientoOut []> {
  
  constructor(private _segRepositorio: SeguimientoRepositorio) { }
  
  execute(filtro: FiltrarSeguimientoIn ): Observable<FiltrarSeguimientoOut []> {
    return this._segRepositorio.filterSeguimiento(filtro)
  }

}
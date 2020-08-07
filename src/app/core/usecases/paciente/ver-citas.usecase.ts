import { Injectable } from '@angular/core';
import { SeguimientoRepositorio } from '../../repositories';
import { UseCase } from '../../base/use-case';
import { FiltrarSeguimientoIn } from '../../domain/inputs';
import { FiltrarSeguimientoOut } from '../../domain/outputs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VerCitasUseCase implements UseCase<FiltrarSeguimientoIn, FiltrarSeguimientoOut[]> {

  constructor(private _seguimientoRepository: SeguimientoRepositorio) { }
  
  execute( seguimiento: FiltrarSeguimientoIn ): Observable<FiltrarSeguimientoOut[]> {
    return this._seguimientoRepository.filterSeguimiento(seguimiento)   
  }
}

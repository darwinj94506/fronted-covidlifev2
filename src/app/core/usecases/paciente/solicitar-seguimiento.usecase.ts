import { Injectable } from '@angular/core';
import { SeguimientoRepositorio } from '../../repositories';
import { UseCase } from '../../base/use-case';
import { SolicitarSeguimientoIn } from '../../domain/inputs';
import { SolicitarSeguimientoOut } from '../../domain/outputs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SolicitarSeguimentoUseCase implements UseCase<SolicitarSeguimientoIn, SolicitarSeguimientoOut> {

  constructor(private _seguimientoRepository: SeguimientoRepositorio) { }
  
  execute( seguimiento: SolicitarSeguimientoIn ): Observable<SolicitarSeguimientoOut> {
    return this._seguimientoRepository.createSeguimiento(seguimiento)   
  }
}

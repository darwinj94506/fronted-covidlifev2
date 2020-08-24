import { Injectable } from '@angular/core';
import { SeguimientoRepositorio } from '../repositories';
import { UseCase } from '../base/use-case';
import { ConsultarUnSeguimientoIn } from '../domain/inputs';
import { ConsultarUnSeguimientoOut } from '../domain/outputs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VerSeguimientoDetalleUseCase implements UseCase<String, ConsultarUnSeguimientoOut> {
  
  constructor(private _segRepositorio: SeguimientoRepositorio) { }
  
  execute( _id: String ): Observable<ConsultarUnSeguimientoOut> {
    let filter : ConsultarUnSeguimientoIn = { _id }
    return this._segRepositorio.getSeguimientoById(filter)
  }
}
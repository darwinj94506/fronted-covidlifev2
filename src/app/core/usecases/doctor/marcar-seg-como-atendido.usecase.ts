import { Injectable } from '@angular/core';
import { SeguimientoRepositorio } from '../../repositories';
import { UseCase } from '../../base/use-case';
import { Observable } from 'rxjs';
import { AtenderSolicitudSeguimientoIn } from '../../domain/inputs';
import { AtenderSolicitudSeguimientoOut } from '../../domain/outputs';
@Injectable({
  providedIn: 'root'
})

export class MacarSeguimientoComoAtendido implements UseCase<AtenderSolicitudSeguimientoIn, AtenderSolicitudSeguimientoOut> {

  constructor(private _segRepositorio: SeguimientoRepositorio) { }

  execute(seguimiento: AtenderSolicitudSeguimientoIn): Observable<AtenderSolicitudSeguimientoOut> {    
    return this._segRepositorio.atenderSeguimiento(seguimiento)   
  }

}

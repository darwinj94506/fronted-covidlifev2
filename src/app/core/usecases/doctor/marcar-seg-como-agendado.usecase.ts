import { Injectable } from '@angular/core';
import { SeguimientoRepositorio } from '../../repositories';
import { UseCase } from '../../base/use-case';
import { AtenderSolicitudSeguimientoIn } from '../../domain/inputs';
import { AtenderSolicitudSeguimientoOut } from '../../domain/outputs';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class MacarSeguimientoComoAgendado implements UseCase<AtenderSolicitudSeguimientoIn, AtenderSolicitudSeguimientoOut> {
  constructor(private _segRepositorio: SeguimientoRepositorio) { }

  execute(seguimiento: AtenderSolicitudSeguimientoIn): Observable<AtenderSolicitudSeguimientoOut> {    
    return this._segRepositorio.agendarSeguimiento(seguimiento);
  }

}

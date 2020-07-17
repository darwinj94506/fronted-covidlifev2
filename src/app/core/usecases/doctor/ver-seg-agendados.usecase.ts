import { Injectable } from '@angular/core';
import { SeguimientoRepositorio } from '../../repositories';
import { UseCase } from '../../base/use-case';
import { ISeguimientoEntity } from '../../domain/entities';
import { SeguimientoEstadoEnum } from '../../domain/enums'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VerSeguimientosAgendadosUseCase implements UseCase<void, ISeguimientoEntity> {
  
  constructor(private _segRepositorio: SeguimientoRepositorio) { }
  
  execute(): Observable<ISeguimientoEntity> {
    return this._segRepositorio.getSeguimientosPorEstado(SeguimientoEstadoEnum.AGENDADO)
  }

}
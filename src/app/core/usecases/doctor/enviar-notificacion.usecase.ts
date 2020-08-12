import { Injectable } from '@angular/core';
import { SeguimientoRepositorio } from '../../repositories';
import { UseCase } from '../../base/use-case';
import { CrearNotificacionIn } from '../../domain/inputs';
import { CrearNotificacionOut } from '../../domain/outputs';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class EnviarNotificacionUseCase implements UseCase<CrearNotificacionIn, CrearNotificacionOut> {
  constructor(private _segRepositorio: SeguimientoRepositorio) { }

  execute(seguimiento: CrearNotificacionIn): Observable<CrearNotificacionOut> {    
    return this._segRepositorio.createNotification(seguimiento);
  }

}

import { Injectable } from '@angular/core';
import { SeguimientoRepositorio } from '../../repositories';
import { UseCase } from '../../base/use-case';
import { EditarSeguimientoOut } from '../../domain/outputs';
import { EditarSeguimientoIn } from '../../domain/inputs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EditarSeguimientosUseCase implements UseCase<EditarSeguimientoIn, EditarSeguimientoOut> {
  
  constructor(private _segRepositorio: SeguimientoRepositorio) { }
  
  execute(seguimiento: EditarSeguimientoIn ): Observable<EditarSeguimientoOut> {
    return this._segRepositorio.editarSeguimiento(seguimiento)
  }
}
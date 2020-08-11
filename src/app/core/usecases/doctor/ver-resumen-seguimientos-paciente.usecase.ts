import { Injectable } from '@angular/core';
import { SeguimientoRepositorio } from '../../repositories';
import { UseCase } from '../../base/use-case';
import { SeguimientoCompletoPacienteIn } from '../../domain/inputs';
import { SeguimientoCompletoPacienteOut } from '../../domain/outputs'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VerResumenSeguimientosPacienteUseCase implements UseCase<SeguimientoCompletoPacienteIn, SeguimientoCompletoPacienteOut[]> {
  
  constructor(private _segRepositorio: SeguimientoRepositorio) { }
  
  execute(data: SeguimientoCompletoPacienteIn): Observable<SeguimientoCompletoPacienteOut[]> {
    return this._segRepositorio.getResumenSeguimientosPaciente(data)
  }

}
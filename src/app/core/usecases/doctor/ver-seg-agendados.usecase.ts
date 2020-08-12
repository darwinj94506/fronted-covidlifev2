import { Injectable } from '@angular/core';
import { SeguimientoRepositorio } from '../../repositories';
import { UseCase } from '../../base/use-case';
import { FiltrarSeguimientoIn } from '../../domain/inputs';
import { FiltrarSeguimientoOut } from '../../domain/outputs';
import { SeguimientoEstadoEnum } from '../../domain/enums'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VerSeguimientosAgendadosUseCase implements UseCase<{ idHospital: String, idDoctor: String }, FiltrarSeguimientoOut[]> {
  
  constructor(private _segRepositorio: SeguimientoRepositorio) { }
  
  execute( data : { idHospital: String, idDoctor: String  }): Observable<FiltrarSeguimientoOut[]> {
    let filter : FiltrarSeguimientoIn = {
      fechaUltimos:{
        createAt:new Date(),
        isUltimos: false,
        AndIdDoctor:data.idDoctor,
        AndIdHospital:data.idHospital,
        AndEstado: SeguimientoEstadoEnum.AGENDADO
      }
    }
    return this._segRepositorio.filterSeguimiento(filter)
  }

}
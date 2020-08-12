import { Injectable } from '@angular/core';
import { SeguimientoRepositorio } from '../../repositories';
import { UseCase } from '../../base/use-case';
import { FiltrarSeguimientoOut } from '../../domain/outputs';
import { FiltrarSeguimientoIn } from '../../domain/inputs';
import { SeguimientoEstadoEnum } from '../../domain/enums';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VerSeguimientosNoAtendidosConLLamadaUseCase implements UseCase<{ idHospital:String, idDoctor }, FiltrarSeguimientoOut[]> {
  
  constructor(private _segRepositorio: SeguimientoRepositorio) { }
  
  execute(data: { idHospital:String, idDoctor }): Observable<FiltrarSeguimientoOut[]> {
      let filter : FiltrarSeguimientoIn = {
      fechaUltimos:{
        createAt:new Date(),
        isUltimos: true,
        AndIdDoctor:data.idDoctor,
        AndIdHospital:data.idHospital,
        AndEstado: SeguimientoEstadoEnum.SOLICITADO_CON_LLAMADA
      }
    }
    return this._segRepositorio.filterSeguimiento(filter)
  }

}
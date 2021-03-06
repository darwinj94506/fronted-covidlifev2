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

export class VerSeguimientosNoAtendidosConLLamadaUseCase implements UseCase<String, FiltrarSeguimientoOut[]> {
  
  constructor(private _segRepositorio: SeguimientoRepositorio) { }
  
  execute(idHospital: String) : Observable<FiltrarSeguimientoOut[]> {
      let filter : FiltrarSeguimientoIn = {
      fechaUltimos:{
        createAt:new Date(),
        isUltimos: true,
        AndIdHospital:idHospital,
        AndEstado: SeguimientoEstadoEnum.SOLICITADO_CON_LLAMADA
      }
    }
    return this._segRepositorio.filterSeguimiento(filter)
  }

}
import { Injectable } from '@angular/core';
import { EstadisticasRepository } from '../../repositories';
import { UseCase } from '../../base/use-case';
import { UsuarioSinSeguimientoPorDiaIn } from '../../domain/inputs';
import { UsuarioSinSeguimientoPorDiaOut } from '../../domain/outputs';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class VerPacientesSinSeguimientosPorDiaUseCase implements UseCase<UsuarioSinSeguimientoPorDiaIn, UsuarioSinSeguimientoPorDiaOut[]> {
  constructor(private _estRepo: EstadisticasRepository) { }

  execute(params: UsuarioSinSeguimientoPorDiaIn ): Observable<UsuarioSinSeguimientoPorDiaOut[]> {    
    return this._estRepo.getUsuarioSinSeguimientosPorDia(params)
  }
}

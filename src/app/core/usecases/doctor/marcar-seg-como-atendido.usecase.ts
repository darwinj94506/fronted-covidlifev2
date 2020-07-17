import { Injectable } from '@angular/core';
import { SeguimientoRepositorio } from '../../repositories';
import { UseCase } from '../../base/use-case';
import { IFollowUpInput  } from '../../domain/inputs';
import { ISeguimientoEntity } from '../../domain/entities';
import { Observable } from 'rxjs';
import { SeguimientoEstadoEnum, DiagnosticoActualEnum } from '../../domain/enums';
// import { FollowUpRepositoryMapper } from '../mappers'

@Injectable({
  providedIn: 'root'
})

export class MacarSeguimientoComoAtendido implements UseCase<ISeguimientoEntity, ISeguimientoEntity> {

//   private _mapper = new FollowUpRepositoryMapper ();

  constructor(private _segRepositorio: SeguimientoRepositorio) { }

  execute(seguimiento: ISeguimientoEntity): Observable<ISeguimientoEntity> {    
    return this._segRepositorio.update(seguimiento)   
  }

}

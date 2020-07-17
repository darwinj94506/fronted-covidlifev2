import { Injectable } from '@angular/core';
import {  EspacioRepositorio } from '../../repositories';
import { UseCase } from '../../base/use-case';
// import { IFollowUpInput  } from '../../domain/inputs';
// import { IFollowUpResponse } from '../../domain/responses';
import { IEspacioEntity } from '../../domain/entities';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CRUDEnum } from '../../domain/enums';
import { FollowUpRepositoryMapper } from '../../mappers'

@Injectable({
  providedIn: 'root'
})

export class GestionarEspacioCaseUse implements UseCase<IEspacioEntity, IEspacioEntity> {

  constructor(private espacioRepo: EspacioRepositorio) { }
  
  execute(espacio: IEspacioEntity, typeCRUD: CRUDEnum): Observable<IEspacioEntity> {
        
    switch (typeCRUD) {
        case CRUDEnum.CREATE:
            return this.espacioRepo.create(espacio)
        case CRUDEnum.UPDATE:
          return this.espacioRepo.update(espacio)
        case CRUDEnum.DELETE:
            return this.espacioRepo.delete(espacio);
        default:
            return null;
    }
  }

}

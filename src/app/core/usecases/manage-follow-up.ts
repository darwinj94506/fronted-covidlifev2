import { Injectable } from '@angular/core';
import { FollowUpRepository, } from '../repositories';
import { UseCase } from '../base/use-case';
import { IFollowUpInput  } from '../domain/inputs';
import { IFollowUpResponse } from '../domain/responses';
import { IFollowUpEntity } from '../domain/entities';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CRUDEnum } from '../domain/enums/crud-enum';
import { FollowUpRepositoryMapper } from '../mappers'

@Injectable({
  providedIn: 'root'
})

export class ManageFollowUpUsecase implements UseCase<IFollowUpInput , IFollowUpEntity | IFollowUpEntity[]> {

  private _mapper = new FollowUpRepositoryMapper ();

  constructor(private _followUpRepository: FollowUpRepository) { }
  
  execute(params: IFollowUpInput, typeCRUD: CRUDEnum): Observable<IFollowUpEntity | IFollowUpEntity[]> {
    
    let followUp: IFollowUpEntity = this._mapper.mapFrom(params);
    
    switch (typeCRUD) {
        case CRUDEnum.CREATE:
            return this._followUpRepository.create(followUp)
        case CRUDEnum.UPDATE:
          return this._followUpRepository.update(followUp)
        case CRUDEnum.DELETE:
            return this._followUpRepository.delete(followUp);
        case CRUDEnum.READ:
            return this._followUpRepository.all();
        default:
            return null;
    }
  }

}

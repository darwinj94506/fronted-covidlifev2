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

export class MarkFollowUpAsAttendedUsecase implements UseCase<IFollowUpResponse, IFollowUpEntity> {

  private _mapper = new FollowUpRepositoryMapper ();

  constructor(private _followUpRepository: FollowUpRepository) { }

  execute(params: IFollowUpResponse): Observable<IFollowUpEntity> {    
    let followUp: IFollowUpEntity = this._mapper.mapFrom(params);
    return this._followUpRepository.update(followUp)   
  }

}

import { Injectable } from '@angular/core';
import { FollowUpRepository, } from '../repositories';
import { UseCase } from '../base/use-case';
import { IFollowUpResponse } from '../domain/responses';
import { IFollowUpEntity } from '../domain/entities';
import { Observable } from 'rxjs';
import { FollowUpRepositoryMapper } from '../mappers'

@Injectable({
  providedIn: 'root'
})

export class MarkFollowUpAsScheduledUsecase implements UseCase<IFollowUpResponse, IFollowUpEntity> {

  private _mapper = new FollowUpRepositoryMapper ();

  constructor(private _followUpRepository: FollowUpRepository) { }

  execute(params: IFollowUpResponse): Observable<IFollowUpEntity> {    
    let followUp: IFollowUpEntity = this._mapper.mapFrom(params);
    return this._followUpRepository.update(followUp)   
  }

}

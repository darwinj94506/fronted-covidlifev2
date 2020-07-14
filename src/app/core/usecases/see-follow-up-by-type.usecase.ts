import { Injectable } from '@angular/core';
import { FollowUpRepository } from '../repositories';
import { UseCase } from '../base/use-case';
import { IFollowUpResponse } from '../domain/responses';
import { FollowUpTypeEnum, FollowUpStateEnum} from '../domain/enums'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SeeFollowUpsByTypeUsecase implements UseCase<FollowUpTypeEnum, IFollowUpResponse> {

  constructor(private _followRepository: FollowUpRepository) { }

  execute(type : FollowUpTypeEnum, state : FollowUpStateEnum): Observable<IFollowUpResponse> {
    return this._followRepository.getFolloWUpsByType(type, state);
  }

 

}
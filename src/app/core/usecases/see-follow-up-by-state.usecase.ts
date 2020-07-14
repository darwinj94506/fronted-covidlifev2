import { Injectable } from '@angular/core';
import { FollowUpRepository } from '../repositories';
import { UseCase } from '../base/use-case';
import { IFollowUpResponse } from '../domain/responses';
import { FollowUpStateEnum } from '../domain/enums'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SeeFollowUpsByStateUsecase implements UseCase<FollowUpStateEnum, IFollowUpResponse> {

  constructor(private _followRepository: FollowUpRepository) { }

  execute(state : FollowUpStateEnum): Observable<IFollowUpResponse> {
    return this._followRepository.getFollowUpsByState(state)
  }

}
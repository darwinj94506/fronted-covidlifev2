import { Injectable, Injector} from '@angular/core';
import { FollowUpRepository } from '../../../core/repositories';
import { GenerciFakeDbRepository} from './generic-fakedb';
import { IFollowUpEntity } from '../../../core/domain/entities';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FollowUpStateEnum, FollowUpTypeEnum} from '../../../core/domain/enums'
@Injectable({ providedIn:'root'})
export class FollowUpFkDBRepository extends GenerciFakeDbRepository<IFollowUpEntity> implements FollowUpRepository{
    
    constructor(injector: Injector, private _http: HttpClient){
        super('seguimientos', null, injector);
    }

    getFollowUpsByState(state:FollowUpStateEnum){
        console.log(state);
        return this._http.get(`${this.baseUrl}/${this.source}?state=${state}`)
    }

    getFolloWUpsByType(type:FollowUpTypeEnum, state: FollowUpStateEnum){
        console.log(type);
        return this._http.get(`${this.baseUrl}/${this.source}?type=${type}&state=${state}`)
    }

}
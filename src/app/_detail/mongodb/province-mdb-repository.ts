import { Injectable, Injector} from '@angular/core';
import { IProvinceRepository } from '../../aplication';
import { MongoDBRepository} from './mongo-repository';
import { PROVINCE_OPERATIONS } from '../graphq';
import { IProvince } from '../../domain';
// import {Apollo} from 'apollo-angular';

@Injectable({ providedIn:'root'})
export class ProvinceMDBRepository extends MongoDBRepository<IProvince> implements IProvinceRepository{
    
     
    constructor(injector: Injector){
        super(PROVINCE_OPERATIONS, injector);
    }

    customMethod(): void {
        console.log("custom method province");
    }
}
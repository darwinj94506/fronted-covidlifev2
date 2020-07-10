import { Injectable, Injector} from '@angular/core';
import { IParroquiaRepository } from '../../aplication';
import { MongoDBRepository} from './mongo-repository';
import { PARROQUIA_OPERATIONS } from '../graphq';
import { IParroquia } from '../../domain';

@Injectable({ providedIn:'root'})
export class ProvinceMDBRepository extends MongoDBRepository<IParroquia> implements IParroquiaRepository{
    
    constructor(injector: Injector){
        super(PARROQUIA_OPERATIONS, null, injector);
    }

    customMethod(): void {
        console.log("custom method PARROQUIA");
    }
}
import { Injectable, Injector} from '@angular/core';
import { ICantonRepository } from '../../aplication';
import { MongoDBRepository} from './mongo-repository';
import { CANTON_OPERATIONS } from '../graphq';
import { ICanton } from '../../domain';
import { CantonFormComponent } from '../../modules/root-user/pages/places/canton/canton-form/canton-form.component';

@Injectable({ providedIn:'root'})
export class CantonMDBRepository extends MongoDBRepository<ICanton> implements ICantonRepository{
    
    constructor(injector: Injector){
        super(CANTON_OPERATIONS, CantonFormComponent, injector);
    }
    
    customMethod(): void {
        console.log("custom method CANTON");
    }
}
import { Injectable, Injector} from '@angular/core';
import { HospitalRepositorio } from '../../../../core/repositories';
import { MongoDBRepository} from '../mongo-repository';
import { HOSPITAL_OPERATIONS } from '../../../graphq';
import { IHospitalEntity } from '../../../../core/domain/entities';
import { of } from 'rxjs'
@Injectable({ providedIn:'root'})
export class HospitalMDBRepository extends MongoDBRepository<IHospitalEntity> implements HospitalRepositorio{
    
    constructor(injector: Injector){
        super(HOSPITAL_OPERATIONS, null, injector);
    }
    getByEspacio(id:String){
        return of ([])
    }

}
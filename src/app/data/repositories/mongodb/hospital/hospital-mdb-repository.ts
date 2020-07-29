import { Injectable, Injector} from '@angular/core';
import { HospitalRepositorio } from '../../../../core/repositories';
import { MongoDBRepository} from '../mongo-repository';
import { HOSPITAL_OPERATIONS } from '../../../graphq';
import { IHospitalEntity } from '../../../../core/domain/entities';
import { FilterHospitalIn } from '../../../../core/domain/inputs';
import { map } from 'rxjs/operators'
@Injectable({ providedIn:'root'})
export class HospitalMDBRepository extends MongoDBRepository<IHospitalEntity> implements HospitalRepositorio{
    
    constructor(injector: Injector){
        super(HOSPITAL_OPERATIONS, injector);
    }

    listfilterHospital(filter :FilterHospitalIn){
        return this.apollo
        .watchQuery(
          { 
            query: HOSPITAL_OPERATIONS.listFilterHospital.gql,
            variables: {
              data: filter
            },
          })
        .valueChanges.pipe(
            map(( { data } ) => data[HOSPITAL_OPERATIONS.listFilterHospital.resolve] ))
    }

}
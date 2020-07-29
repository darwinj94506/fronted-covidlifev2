import { Injectable, Injector} from '@angular/core';
import { SeguimientoRepositorio } from '../../../../core/repositories';
import { MongoDBRepository} from '../mongo-repository';
import { SEGUIMIENTO_OPERATIONS } from '../../../graphq';
import { ISeguimientoEntity } from '../../../../core/domain/entities';
import { SolicitarSeguimientoIn } from '../../../../core/domain/inputs';
import { map } from 'rxjs/operators'
@Injectable({ providedIn:'root'})
export class SeguimientoMDBRepository extends MongoDBRepository<ISeguimientoEntity> implements SeguimientoRepositorio{
    
    constructor(injector: Injector){
        super(SEGUIMIENTO_OPERATIONS, injector);
    }
 
    createSeguimiento(seguimiento :SolicitarSeguimientoIn){
        return this.apollo.mutate({
            mutation: SEGUIMIENTO_OPERATIONS.create.gql,
            variables: {
                data: seguimiento
            },
        }).pipe(
            map(( { data } )=> data[SEGUIMIENTO_OPERATIONS.create.resolve] )) 
    }

    getSeguimientosAtendidos(){

    }
    getSeguimientosPorEstado(){
        
    }


   
}
import { Injectable, Injector} from '@angular/core';
import { EspacioRepositorio } from '../../../../core/repositories';
import { ICredentialsInput,SignupIn } from '../../../../core/domain/inputs';
import { EspacioEnum} from '../../../../core/domain/enums';
import { MongoDBRepository} from '../mongo-repository';
import { ESPACIO_OPERATIONS } from '../../../graphq';
import { IEspacioEntity } from '../../../../core/domain/entities';
import { IUserResponse } from '../../../../core/domain/responses';
import { Observable, throwError, of} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn:'root'})
export class EspacioMDBRepository extends MongoDBRepository<IEspacioEntity> implements EspacioRepositorio{
    
    constructor(injector: Injector){
        super(ESPACIO_OPERATIONS, null, injector);
    }

  getPorTipo_Y_IdEspacio(tipo:EspacioEnum, id: string){
    return of(throwError)
  }

  getProvincias(){
    return of(throwError)
      
  }
 
}
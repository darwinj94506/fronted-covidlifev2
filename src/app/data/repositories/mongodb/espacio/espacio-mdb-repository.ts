import { Injectable, Injector} from '@angular/core';
import { EspacioRepositorio } from '../../../../core/repositories';
import { FilterEspaceIn } from '../../../../core/domain/inputs';
import { MongoDBRepository} from '../mongo-repository';
import { ESPACIO_OPERATIONS } from '../../../graphq';
import { IEspacioEntity } from '../../../../core/domain/entities';
import { IUserResponse } from '../../../../core/domain/responses';
import { Observable, throwError, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { AllEspaciosGQL } from './espacios-query';
import { EspacioEnum } from 'src/app/core/domain/enums';

@Injectable({ providedIn:'root'})
export class EspacioMDBRepository extends MongoDBRepository<IEspacioEntity> implements EspacioRepositorio{
    
    constructor(injector:Injector, private allEspacioQuery :AllEspaciosGQL){
        super(ESPACIO_OPERATIONS, injector);
    }

  getPorTipo_O_IdPadre(filter: FilterEspaceIn){
    console.log(filter);
    return this.apollo
        .watchQuery(
          { 
            query: ESPACIO_OPERATIONS.listByTypeOIdPadre.gql,
            variables: {
                dataFilter: filter
              },    
          })
        .valueChanges.pipe(
            map(( { data } ) => data[ESPACIO_OPERATIONS.listByTypeOIdPadre.resolve] ))
  }

  create(entity: IEspacioEntity): Observable<any | null> {
    let filter: FilterEspaceIn = { idEspacioPadre: entity.idEspacio}
    return this.apollo.mutate({
        mutation: ESPACIO_OPERATIONS.create.gql,
        variables: {
          data: entity
        },
        optimisticResponse: {
          __typename: 'Mutation',
          addEspacio: {
            __typename: 'Espacio',
            _id: entity._id,
            nombre: entity.nombre,
            tipo:entity.tipo
          },
        },
        update: (proxy, { data: { addEspacio } }) => {
          const data = proxy.readQuery({ 
            query: ESPACIO_OPERATIONS.listByTypeOIdPadre.gql,
            variables: {
              dataFilter: filter
            }    
          });
          console.log(data);
          data['listfilterEspacio'] = [...data['listfilterEspacio'], addEspacio];
          proxy.writeQuery({ query: ESPACIO_OPERATIONS.listByTypeOIdPadre.gql,
            variables: {
              dataFilter: filter
            }, 
            data });
        },   
      }).pipe(
          map(( { data } )=> data[ESPACIO_OPERATIONS.create.resolve] ))
  }
}
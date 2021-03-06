import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { SEGUIMIENTO_OPERATIONS } from '../data/graphq';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FiltrarSeguimientoOut } from '../core/domain/outputs';
import { FiltrarSeguimientoIn, 
         ObtenerNotificacionesEnviadasIn,
         ObtenerNotificacionesRecibidasIn } from '../core/domain/inputs';
@Injectable({providedIn:'root'})
export class SuscriptionService {
    
    constructor( private apollo: Apollo ){

    }

    filterSeguimiento(filter: FiltrarSeguimientoIn): QueryRef<any>{
        return this.apollo
           .watchQuery(
           { 
               query: SEGUIMIENTO_OPERATIONS.filter.gql,
               variables:{
                   data:filter
               }
           })
        //    .valueChanges.pipe(
        //        map(( { data } ) => data[SEGUIMIENTO_OPERATIONS.filter.resolve] ))
   }

   
   filterSeguimiento2(filter: FiltrarSeguimientoIn): Observable<FiltrarSeguimientoOut[]>{
    return this.apollo
        .watchQuery(
        { 
            query: SEGUIMIENTO_OPERATIONS.filter.gql,
            variables:{
                data:filter
            }
        })
        .valueChanges.pipe(
            map(( { data } ) => data[SEGUIMIENTO_OPERATIONS.filter.resolve] ))
}

  


   getNotificationesEnviadas(filter: ObtenerNotificacionesEnviadasIn): QueryRef<any>{
        return this.apollo
            .watchQuery(
            { 
                query: SEGUIMIENTO_OPERATIONS.verNotificaionesEnviadas.gql,
                variables:{
                    data:filter
                }
            })
    }

    getNotificationesRecibidas(filter: ObtenerNotificacionesRecibidasIn): QueryRef<any>{
        return this.apollo
            .watchQuery(
            { 
                query: SEGUIMIENTO_OPERATIONS.getNoficacionesRecibidas.gql,
                variables:{
                    data:filter
                }
            })
    }

} 


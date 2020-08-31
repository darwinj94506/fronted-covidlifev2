import { Injectable, Injector} from '@angular/core';
import { SeguimientoRepositorio } from '../../../../core/repositories';
import { MongoDBRepository} from '../mongo-repository';
import { SEGUIMIENTO_OPERATIONS } from '../../../graphq';
import { ISeguimientoEntity } from '../../../../core/domain/entities';
import { SolicitarSeguimientoIn, 
         ConsultarUnSeguimientoIn, 
         FiltrarSeguimientoIn, 
         AtenderSolicitudSeguimientoIn,
         SeguimientoCompletoPacienteIn,
         CrearNotificacionIn,
         EditarSeguimientoIn,
         AgendarSolicitudSeguimientoIn} from '../../../../core/domain/inputs';
import { SolicitarSeguimientoOut, 
         ConsultarUnSeguimientoOut, 
         FiltrarSeguimientoOut, 
         AtenderSolicitudSeguimientoOut,
         SeguimientoCompletoPacienteOut,
         CrearNotificacionOut,
         EditarSeguimientoOut,
         AgendarSolicitudSeguimientoOut} from '../../../../core/domain/outputs';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
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

    getSeguimientoById(idSeguimiento : ConsultarUnSeguimientoIn): Observable<ConsultarUnSeguimientoOut>{
        return this.apollo
            .watchQuery(
            { 
                query: SEGUIMIENTO_OPERATIONS.getById.gql,
                variables:{
                    data:idSeguimiento
                }
            })
            .valueChanges.pipe(
                map(( { data } ) => data[SEGUIMIENTO_OPERATIONS.getById.resolve] ))

    }

    filterSeguimiento(filter: FiltrarSeguimientoIn): Observable<FiltrarSeguimientoOut[]>{
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

    suscriptionSeguimiento(filter: FiltrarSeguimientoIn) {
        
        const allSeguimientos =  this.apollo.watchQuery(
            { 
                query: SEGUIMIENTO_OPERATIONS.filter.gql,
                variables:{
                    data:filter
                }
            })

        return allSeguimientos.subscribeToMore({
            document: SEGUIMIENTO_OPERATIONS.suscription.gql,
            updateQuery:(previous, { subscriptionData}) => {
                console.log([previous, subscriptionData]);
                const newAllSeguimientos = [
                    subscriptionData.data[SEGUIMIENTO_OPERATIONS.filter.resolve],
                    ...previous[SEGUIMIENTO_OPERATIONS.filter.resolve]
                ];
                return {
                    ...previous[SEGUIMIENTO_OPERATIONS.filter.resolve],
                    filterSeguimiento: newAllSeguimientos
                }
            }
        });

    }

    atenderSeguimiento(seguimiento: AtenderSolicitudSeguimientoIn):Observable<AtenderSolicitudSeguimientoOut>{
        return this.apollo.mutate({
            mutation: SEGUIMIENTO_OPERATIONS.atender.gql,
            variables: {
                data: seguimiento
            },
        }).pipe(
            map(( { data } )=> data[SEGUIMIENTO_OPERATIONS.atender.resolve] )) 
    }

    agendarSeguimiento(seguimiento: AgendarSolicitudSeguimientoIn):Observable<AgendarSolicitudSeguimientoOut>{
        return this.apollo.mutate({
            mutation: SEGUIMIENTO_OPERATIONS.agendar.gql,
            variables: {
                data: seguimiento
            },
        }).pipe(
            map(( { data } )=> data[SEGUIMIENTO_OPERATIONS.agendar.resolve] )) 
    }

    getResumenSeguimientosPaciente(params: SeguimientoCompletoPacienteIn){
        return this.apollo
            .watchQuery(
            { 
                query: SEGUIMIENTO_OPERATIONS.resumenSeguimientos.gql,
                variables:{
                    data:params
                }
            })
            .valueChanges.pipe(
                map(( { data } ) => data[SEGUIMIENTO_OPERATIONS.resumenSeguimientos.resolve] ))

    }

    createNotification(crearNotificacionIn:CrearNotificacionIn){
        return this.apollo.mutate({
            mutation: SEGUIMIENTO_OPERATIONS.createNotification.gql,
            variables: {
                data: crearNotificacionIn
            },
        }).pipe(
            map(( { data } )=> data[SEGUIMIENTO_OPERATIONS.createNotification.resolve] )) 
    }

    editarSeguimiento(seguimiento: EditarSeguimientoIn): Observable<EditarSeguimientoOut>{
        return this.apollo.mutate({
            mutation: SEGUIMIENTO_OPERATIONS.update.gql,
            variables: {
                data: seguimiento
            },
        }).pipe(
            map(( { data } )=> data[SEGUIMIENTO_OPERATIONS.update.resolve] ))

    }

}
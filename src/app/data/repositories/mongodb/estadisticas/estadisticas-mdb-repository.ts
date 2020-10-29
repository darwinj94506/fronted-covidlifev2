import { Injectable, Injector} from '@angular/core';
import { EstadisticasRepository } from '../../../../core/repositories';
import { MongoDBRepository} from '../mongo-repository';
import { ESTADISTICAS_OPERATIONS } from '../../../graphq';
import { IEntity } from '../../../../core/domain/entities';
import { ContadoresEstadisticaIn, MapasDatosIn, UsuarioSinSeguimientoPorDiaIn } from '../../../../core/domain/inputs';
import { ContadoresEstadisticaOut, MapasDatosOut, UsuarioSinSeguimientoPorDiaOut } from '../../../../core/domain/outputs';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
@Injectable({ providedIn:'root'})
export class EstaditicasMDBRepository extends MongoDBRepository<IEntity> implements EstadisticasRepository{
    
    constructor(injector: Injector){
        super(ESTADISTICAS_OPERATIONS, injector);
    }
    getCountStatistics(filter: ContadoresEstadisticaIn): Observable<ContadoresEstadisticaOut>{
        return this.apollo
            .watchQuery(
            { 
                query: ESTADISTICAS_OPERATIONS.getCountPacientes.gql,
                variables:{
                    data:filter
                }
            })
            .valueChanges.pipe(
                map(( { data } ) => data[ESTADISTICAS_OPERATIONS.getCountPacientes.resolve] ))

    }

    getEstadisticasMapas(filter: MapasDatosIn ):Observable<MapasDatosOut>{
        return this.apollo
        .watchQuery(
        { 
            query: ESTADISTICAS_OPERATIONS.getEstadisticasMapas.gql,
            variables:{
                data:filter
            }
        })
        .valueChanges.pipe(
            map(( { data } ) => data[ESTADISTICAS_OPERATIONS.getEstadisticasMapas.resolve] ))

    }

    getUsuarioSinSeguimientosPorDia(filter: UsuarioSinSeguimientoPorDiaIn): Observable<UsuarioSinSeguimientoPorDiaOut[]>{
        return this.apollo
        .watchQuery(
        { 
            query: ESTADISTICAS_OPERATIONS.getPacientesSinSeguimientos.gql,
            variables:{
                data:filter
            }
        })
        .valueChanges.pipe(
            map(( { data } ) => data[ESTADISTICAS_OPERATIONS.getPacientesSinSeguimientos.resolve] ))
    }


}
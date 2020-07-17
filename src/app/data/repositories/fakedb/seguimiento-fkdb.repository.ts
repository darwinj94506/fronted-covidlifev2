import { Injectable, Injector} from '@angular/core';
import { SeguimientoRepositorio } from '../../../core/repositories';
import { GenerciFakeDbRepository} from './generic-fakedb';
import { ISeguimientoEntity } from '../../../core/domain/entities';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SeguimientoTipoEnum, SeguimientoEstadoEnum} from '../../../core/domain/enums'
@Injectable({ providedIn:'root'})
export class SeguimientoFkDBRepository extends GenerciFakeDbRepository<ISeguimientoEntity> implements SeguimientoRepositorio{
    
    constructor(injector: Injector, private _http: HttpClient){
        super('seguimientos', null, injector);
    }

     getSeguimientosAtendidos() {
        return this._http.get(`${this.baseUrl}/${this.source}?estado=${SeguimientoEstadoEnum.REVISADO_CON_LLAMADA}
            &estado=${SeguimientoEstadoEnum.REVISADO_SIN_LLAMADA}`)
    }

    getSeguimientosPorEstado(state: SeguimientoEstadoEnum){
        return this._http.get(`${this.baseUrl}/${this.source}?estado=${state}`)
    }

}
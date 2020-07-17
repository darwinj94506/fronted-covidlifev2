import { Injectable, Injector} from '@angular/core';
import { EspacioRepositorio } from '../../../core/repositories';
import { GenerciFakeDbRepository} from './generic-fakedb';
import { IEspacioEntity } from '../../../core/domain/entities';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EspacioEnum } from '../../../core/domain/enums'
@Injectable({ providedIn:'root'})

export class EspacioFkDbRepositorio extends GenerciFakeDbRepository<IEspacioEntity> implements EspacioRepositorio{
    
    constructor(injector: Injector, private _http: HttpClient){
        super('espacios', null, injector);
    }
    
    getPorTipo_Y_IdEspacio( tipo:EspacioEnum, idEspacio:string): any {
        return this._http.get(`${this.baseUrl}/${this.source}?tipo=${tipo}&idEspacio=${idEspacio}`)
    }

    getProvincias(): any {
        return this._http.get(`${this.baseUrl}/${this.source}?tipo=${EspacioEnum.PROVINCIA}`);
    }
}
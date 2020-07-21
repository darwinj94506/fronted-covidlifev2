import { Injectable } from '@angular/core';
import { HospitalRepositorio } from '../../repositories';
import { UseCase } from '../../base/use-case';
import { IHospitalEntity } from '../../domain/entities';
import { Observable } from 'rxjs';
import { CRUDEnum } from '../../domain/enums';

@Injectable({
  providedIn: 'root'
})

export class GestionarHospitalCaseUse implements UseCase<IHospitalEntity, IHospitalEntity> {

  constructor(private _hospitalRep: HospitalRepositorio) { }
  
  execute(hospital: IHospitalEntity, typeCRUD: CRUDEnum): Observable<IHospitalEntity> {
        
    switch (typeCRUD) {
        case CRUDEnum.CREATE:
            return this._hospitalRep.create(hospital)
        case CRUDEnum.UPDATE:
          return this._hospitalRep.update(hospital)
        case CRUDEnum.DELETE:
            return this._hospitalRep.delete(hospital);
        default:
            return null;
    }
  }

}

import { Injectable } from '@angular/core';
import {  HospitalRepositorio } from '../../repositories';
import { UseCase } from '../../base/use-case';
import { IHospitalEntity } from '../../domain/entities';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VerHospitalesPorLugarUseCase implements UseCase<String, IHospitalEntity[]> {

  constructor(private hospitalRepo: HospitalRepositorio) { }
  
  execute( id?: String | number ): Observable<IHospitalEntity[]> {
    return this.hospitalRepo.getByEspacio(id)    
  }
}

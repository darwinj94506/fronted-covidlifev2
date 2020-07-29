import { Injectable } from '@angular/core';
import {  HospitalRepositorio } from '../../repositories';
import { UseCase } from '../../base/use-case';
import { IHospitalEntity } from '../../domain/entities';
import { Observable } from 'rxjs';
import { FilterHospitalIn } from '../../domain/inputs';

@Injectable({
  providedIn: 'root'
})

export class VerHospitalesPorLugarUseCase implements UseCase<FilterHospitalIn, IHospitalEntity[]> {

  constructor(private hospitalRepo: HospitalRepositorio) { }
  
  execute( filter: FilterHospitalIn): Observable<IHospitalEntity[]> {
    return this.hospitalRepo.listfilterHospital(filter)    
  }
}

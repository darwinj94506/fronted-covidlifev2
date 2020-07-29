import { GenericRepository } from './generic-repository';
import { IHospitalEntity } from '../domain/entities';
import { FilterHospitalIn } from '../domain/inputs';
import { Observable } from 'rxjs';
export abstract class HospitalRepositorio extends GenericRepository<IHospitalEntity> {
    
   
    abstract listfilterHospital(filter : FilterHospitalIn):Observable<IHospitalEntity[]>
}
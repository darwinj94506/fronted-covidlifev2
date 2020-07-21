import { GenericRepository } from './generic-repository';
import { IHospitalEntity } from '../domain/entities';
export abstract class HospitalRepositorio extends GenericRepository<IHospitalEntity> {
    
    abstract getByEspacio(string: String | number) : any
    
}
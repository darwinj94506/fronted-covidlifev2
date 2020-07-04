import { IGenericRepository } from './generic-repository.interface';
import { IEntity } from '../../domain';
export interface IProvinceRepository extends IGenericRepository<IEntity> {
    customMethod():void;
}
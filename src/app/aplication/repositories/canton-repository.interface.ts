import { IGenericRepository } from './generic-repository.interface';
import { IEntity } from '../../domain';
export interface ICantonRepository extends IGenericRepository<IEntity> {
    customMethod():void;
}
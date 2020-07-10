import { IGenericRepository } from './generic-repository.interface';
import { IEntity } from '../../domain';
export interface IParroquiaRepository extends IGenericRepository<IEntity> {
    customMethod():void;
}
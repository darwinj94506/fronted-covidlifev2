import { IGenericRepository } from './generic-repository.interface';
import { IEntity } from '../../domain';
export interface IUserRepository extends IGenericRepository<IEntity> {
    customMethod():void;
}
import { IEntity } from './entity';
export interface IUserEntity extends IEntity{
    name: string;        
    lastname: string;
    password: string;
    email: string;
}
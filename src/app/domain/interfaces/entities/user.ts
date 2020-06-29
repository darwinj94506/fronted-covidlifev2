import { IEntity } from './entity';
export interface IUser extends IEntity{
    name: string;        
    lastname: string;
    email: string;
    role: any[];
}
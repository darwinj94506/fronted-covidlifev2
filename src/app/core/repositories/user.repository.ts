import { GenericRepository } from './generic-repository';
import { IUserEntity } from '../domain/entities';
import { ICredentialsInput, IRegisterInput } from '../domain/inputs'; 
import {  IUserResponse } from '../domain/responses'; 
import { Observable } from 'rxjs';

export abstract class UserRepository extends GenericRepository<IUserEntity> {
    
    abstract login(credentials: ICredentialsInput): Observable<IUserResponse>;

    abstract register(userToRegister: IRegisterInput): Observable<IUserEntity>;      
}
import { GenericRepository } from './generic-repository';
import { IUserEntity } from '../domain/entities';
import { ICredentialsInput, SignupIn } from '../domain/inputs'; 
import {  IUserResponse } from '../domain/responses'; 
import { Observable } from 'rxjs';

export abstract class UserRepository extends GenericRepository<IUserEntity> {
    
    abstract login(credentials: ICredentialsInput): Observable<IUserResponse>;

    abstract register(userToRegister: SignupIn): Observable<IUserEntity>;      
}
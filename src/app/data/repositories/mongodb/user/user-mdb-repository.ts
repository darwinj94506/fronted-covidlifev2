import { Injectable, Injector} from '@angular/core';
import { UserRepository } from '../../../../core/repositories/user.repository';
import { ICredentialsInput,SignupIn } from '../../../../core/domain/inputs';
import { MongoDBRepository} from '../mongo-repository';
import { USER_OPERATIONS } from '../../../graphq';
import { IUserEntity } from '../../../../core/domain/entities';
import { IUserResponse } from '../../../../core/domain/responses';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn:'root'})
export class UserMDBRepository extends MongoDBRepository<IUserEntity> implements UserRepository{
    
    constructor(injector: Injector){
        super(USER_OPERATIONS, null, injector);
    }

    login (credentials: ICredentialsInput) : Observable<IUserResponse>{
        return this.apollo.mutate({
            mutation: USER_OPERATIONS.login.gql,
            variables: {
                data: credentials
            },
        }).pipe(
            map(( { data } )=> data[USER_OPERATIONS.login.resolve] ))
    }

    register (user: any): Observable<IUserEntity>{
        return this.apollo.mutate({
            mutation: USER_OPERATIONS.register.gql,
            variables: {
                data: user
            },
        }).pipe(
            map(( { data } )=> data[USER_OPERATIONS.register.resolve] )) 
    }
 
}
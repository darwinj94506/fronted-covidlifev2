import { Injectable} from '@angular/core';
import { IUserRepository } from '../../aplication';
import { FakeDbRepository} from './fake-repository';
import { IEntity, ResourceEnum, CRUDEnum, IUser} from '../../domain';

@Injectable({ providedIn : 'root'})
export class userFDBRepository extends FakeDbRepository<IUser> implements IUserRepository{
    
    constructor(){
        super(ResourceEnum.USER);
    }

    customMethod(): void {
        console.log("custom method");
    }
}
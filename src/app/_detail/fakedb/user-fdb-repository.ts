import { Injectable} from '@angular/core';
import { IUserRepository } from '../../aplication';
import { FakeDbRepository} from './fake-repository';
import { IEntity, IUser} from '../../domain';

@Injectable({ providedIn : 'root'})
export class userFDBRepository extends FakeDbRepository<IUser> implements IUserRepository{
   
    customMethod(): void {
        console.log("custom method");
    }
}
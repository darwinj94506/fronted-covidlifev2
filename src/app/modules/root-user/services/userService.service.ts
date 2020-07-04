import { Injectable } from '@angular/core';
import { IUser } from '../../../domain';
// import { users } from '../../../domain/data/user-data';
import { IGenericRepository, IUserRepository} from '../../../aplication';
import { FakeDbRepository, userFDBRepository } from '../../../_detail';
import { Observable } from 'rxjs';


@Injectable()
export class UserService {


    constructor( private repository: userFDBRepository ){}

    // public users: IUser[] = users;
    public users : Observable<IUser []>

    // public getUsers() {
    //     return this.users;
    // }

    public getUsers() : Observable<IUser[]>{
        this.users = this.repository.all();
        return this.repository.all()
    }

   

}
import { Injectable } from '@angular/core';
// import { User } from '../domain/interfaces/user';
// import { users } from '../domain/data/user-data';
import { Observable } from 'rxjs';
import { Entity } from '../../domain/interfaces/entity';
import { IGenericRepository } from '../../aplication';

@Injectable({ providedIn:'root'})
export class MongoRepository<T  extends Entity> implements IGenericRepository<T>{
    private url:string = '';
    constructor(url : string){
        this.url = url;
    }
    save(entity:T): Observable<T | null> {
        return null;
    }
    update(entity:T): Observable<T | null> {
        return null;
    }
    delete(entity:T): Observable<T | null> {
        return null;
    }
    all(): Observable<T[] | null> {
        return null;
    }

    // public users: User[] = users;
    // public getUser() {
    //     return this.users;
    // }

}
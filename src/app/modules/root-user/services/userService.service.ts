import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';

@Injectable()
export class UserService {

    constructor(){}

    public users : Observable<any []>

    public getUsers() : Observable<any[]>{
        return of([])
    }

   

}
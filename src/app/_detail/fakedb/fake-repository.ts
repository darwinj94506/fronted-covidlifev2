import { Injectable } from '@angular/core';
import { IGenericRepository } from '../../aplication';
import { IEntity, ResourceEnum, CRUDEnum, IUser} from '../../domain';
import { Observable, of } from 'rxjs';
const users: IUser[] =[
    {
        id:'1',
        name:'Darwin',
        lastname:'Guailla',
        email:'darwin@espe.ec',
        role:['ADMIN','PATIENT','DOCTOR']
    },
    {
        id:'2',
        name:'Fernanda',
        lastname:'Espinoza',
        email:'fernanda@espe.ec',
        role:['DOCTOR']
    },
    {
        id:'3',
        name:'Mateo',
        lastname:'Casco',
        email:'mateo@espe.ec',
        role:['ADMIN','PATIENT','DOCTOR']
    },
    {
        id:'4',
        name:'Meghan',
        lastname:'Cuvi',
        email:'meghan@espe.ec',
        role:['DOCTOR']
    }
]

// @Injectable({ providedIn : 'root'})
export class FakeDbRepository< T extends IEntity > implements IGenericRepository<T> {
    

    // private resource: ResourceEnum;
    constructor(private resource: ResourceEnum){
        // this.resource = resource;
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
    all(): Observable<any[] | null> {
        console.log(this.resource);
        return of(users);
    }

}






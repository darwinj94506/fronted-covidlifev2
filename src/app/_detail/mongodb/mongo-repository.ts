import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { IEntity } from '../../domain';
import { IGenericRepository } from '../../aplication';
import {Apollo} from 'apollo-angular';
import { map } from 'rxjs/operators';
import { IOperations } from '../graphq';

export class MongoDBRepository<T  extends IEntity> implements IGenericRepository<T>{
    protected apollo: Apollo
    private operations:IOperations;
    
    constructor(operations : IOperations,  injector: Injector){
        this.apollo = injector.get(Apollo);
        this.operations = operations;
    }
    
    save(entity:T): Observable<any | null> {
        return this.apollo.mutate({
            mutation: this.operations.create.gpl,
            variables: {
              data: entity
            },
            
          }).pipe(
              map(( { data } )=> data[this.operations.create.resolve] ))
    }
    
    update(entity:T): Observable<T | null> {
        return null;
    }
    
    delete(entity:T): Observable<T | null> {
        return null;
    }

    all(): Observable<T[] | null> {
        return this.apollo
        .watchQuery({query: this.operations.all.gpl})
        .valueChanges.pipe(
            map(( { data } ) => data[this.operations.all.resolve] ))
    }

}
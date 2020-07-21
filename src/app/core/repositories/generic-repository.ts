import { Observable } from 'rxjs'
export abstract class  GenericRepository<T> {
    abstract create(entity : T) : Observable<T | null>;
    abstract update(entity : T) : Observable<T | null>;
    abstract delete(entity : T) : Observable<T | null>;
    // abstract all() : Observable<T[] | null>;
}
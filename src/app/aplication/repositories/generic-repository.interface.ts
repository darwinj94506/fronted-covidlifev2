import { Observable } from 'rxjs'
export interface IGenericRepository<T> {
    create(entity : T) : Observable<T | null>;
    update(entity : T) : Observable<T | null>;
    delete(entity : T) : Observable<T | null>;
    all() : Observable<T[] | null>;
}
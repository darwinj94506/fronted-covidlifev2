import { Observable } from 'rxjs'
export interface IGenericRepository<T> {
    save(entity : T) : Observable<T | null>;
    update(entity : T) : Observable<T | null>;
    delete(entity : T) : Observable<T | null>;
    all() : Observable<T[] | null>;
}
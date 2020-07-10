import { Injectable } from '@angular/core';
import { Actions, Effect, ofType  } from '@ngrx/effects';
import { catchError, map, switchMap, mergeMap, tap, flatMap, exhaustMap} from 'rxjs/operators';
import * as actionsCantons  from '../actions/canton.actions';
import { CantonMDBRepository } from '../../../../_detail/mongodb/canton-mdb-repository';
import { Observable, from, of} from 'rxjs';
import { CantonFacade} from '../facades/canton.facade';

@Injectable()
export class ProvinceEffects {

    constructor( private actions$: Actions , 
        private _repository: CantonMDBRepository, private _cantonFacade:CantonFacade ) { }

    @Effect({dispatch:false})
    loadProvinces: Observable<any>= this.actions$.pipe(
        ofType(actionsCantons.loadCantons),
        tap(() => this._repository.all().
        pipe(
        ).subscribe((cantons)=>{
            console.log(cantons);
            this._cantonFacade.loadCantonSuccess(cantons)
            })
        ))

    @Effect()
    createCanton: Observable<any> = this.actions$.pipe(
        ofType(actionsCantons.createCanton),
        exhaustMap(({canton}) => this._repository.create(canton).pipe(
            map((canton) => {
                return actionsCantons.createCantonSuccess()
            }),
            catchError( (err) => {
                return of( actionsCantons.createCantonError({error:err.message}) )
            })
        )),
    )

    @Effect()
    updateCanton: Observable<any> = this.actions$.pipe(
        ofType(actionsCantons.updateCanton),
        switchMap(({canton}) => this._repository.update(canton).pipe(
            map((canton) => {
                return actionsCantons.updateCantonSuccess()
            }),
            catchError( (err) => {
                return of( actionsCantons.updateCantonError({error:err.message}) )
            })
        )),
    )

    @Effect()
    updateCantonSuccess: Observable<any> = this.actions$.pipe(
        ofType(actionsCantons.updateCantonSuccess),
        switchMap( () => of( actionsCantons.loadCantons() )),
        tap( _=>this._repository.closeModalCreateUpdate()
    ))

    @Effect({dispatch : false})
    openModalCreateUpdate = this.actions$.pipe(
        ofType(actionsCantons.openModalCreateUpdate),
        tap(({canton}) => 
            this._repository.openModalCreateUpdate(canton)
        ))

    @Effect()
    openModalConfirmation = this.actions$.pipe(
        ofType(actionsCantons.openModalConfirmation),
        exhaustMap(({canton}) => 
            this._repository.showConfirm().pipe(
                map(() => actionsCantons.deleteCanton({canton})),
                catchError(() => of(actionsCantons.deleteCantonCancel()))
        ))
    )

    @Effect()
    deleteCanton = this.actions$.pipe(
        ofType(actionsCantons.deleteCanton),
        exhaustMap(({canton}) => 
            this._repository.delete(canton).pipe(
                map(() => actionsCantons.deleteCantonSuccess()),
                catchError((err) => of(actionsCantons.deleteCantonError({error:err.message})))
        ))
    )
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType  } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap, exhaustMap, tap, flatMap} from 'rxjs/operators';
import * as actionsProvinces  from '../actions/province.actions';
import { ProvinceService } from '../../services'
import { Observable } from 'rxjs';
import { NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class ProvinceEffects {

    constructor( private actions$: Actions , private _provinceService: ProvinceService,
         private modalService: NgbModal) { }

    @Effect()
    loadProvinces: Observable<any>= this.actions$.pipe(
        ofType(actionsProvinces.loadProvinces),
        switchMap(() => this._provinceService.getProvinces().pipe(
            map((provinces) => {
                return actionsProvinces.loadProvincesSuccess({provinces})
            }),
            catchError( (err) => {
                return of( actionsProvinces.loadProvincesError({error:err.message}) )
            })
        )),
    )

    @Effect()
    createProvince: Observable<any> = this.actions$.pipe(
        ofType(actionsProvinces.createProvince),
        switchMap(({province}) => this._provinceService.createProvince(province).pipe(
            map((province) => {
                return actionsProvinces.createProvinceSuccess()
            }),
            catchError( (err) => {
                return of( actionsProvinces.createProvinceError({error:err.message}) )
            })
        )),
    )

    @Effect()
    createProvinceSuccess: Observable<any> = this.actions$.pipe(
        ofType(actionsProvinces.createProvinceSuccess),
        tap( _ => this.modalService.dismissAll()),
        map( _=> {
            return actionsProvinces.loadProvinces()
        }))

    @Effect()
    openModal = this.actions$.pipe(
        ofType(actionsProvinces.openModal),tap(console.log),
        flatMap(({targetHtml}) => {
            let modalRef: NgbModalRef = this._provinceService.openModalCreateUpdate(targetHtml);
            return modalRef.result
        }
    ),map((result) => {
        console.log(result);
        if (result === undefined || result === null) {
          return  actionsProvinces.closeModal();
        }
        return actionsProvinces.createProvince({province: result});
      })
    ) 
}



// @Effect()
// openModal = this.actions$.pipe(
//     ofType(actionsProvinces.openModal),
//     exhaustMap(({targetHtml}) => {
//         let modalRef: NgbModalRef = this._provinceService.openModalCreateUpdate(targetHtml);
//         return modalRef.result
//     }
// ),map((result: string) => {
//     if (result === undefined || result === null) {
//       return  null
//     }
//     return actionsProvinces.createProvince({province: result});
//   })
// ) 
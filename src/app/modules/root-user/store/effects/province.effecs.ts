// import { Injectable } from '@angular/core';
// import { Actions, createEffect, Effect, ofType  } from '@ngrx/effects';
// import { of } from 'rxjs';
// import { catchError, concatMap, map, switchMap, mergeMap, exhaustMap, tap, flatMap} from 'rxjs/operators';
// import * as actionsProvinces  from '../actions/province.actions';
// import { ProvinceService } from '../../services'
// import { Observable, from} from 'rxjs';
// import { ProvinceFacade} from '../facades/province.facade';
// @Injectable()
// export class ProvinceEffects {

//     constructor( private actions$: Actions , 
//         private _provinceService: ProvinceService, private _provinceFacade:ProvinceFacade ) { }

//     @Effect({dispatch:false})
//     loadProvinces: Observable<any>= this.actions$.pipe(
//         ofType(actionsProvinces.loadProvinces),
//         tap(() => this._provinceService.getProvinces().
//         pipe(
//             // catchError( (err) => {
//             //     return of( actionsProvinces.loadProvincesError({error:err.message}) )
//             // })
//         ).subscribe((provinces)=>{
//             this._provinceFacade.loadProvinceSuccess(provinces)
//         })
//         ))

//     @Effect()
//     createProvince: Observable<any> = this.actions$.pipe(
//         ofType(actionsProvinces.createProvince),
//         exhaustMap(({province}) => this._provinceService.createProvince(province).pipe(
//             map((province) => {
//                 return actionsProvinces.createProvinceSuccess()
//             }),
//             catchError( (err) => {
//                 return of( actionsProvinces.createProvinceError({error:err.message}) )
//             })
//         )),
//     )

//     @Effect()
//     updateProvince: Observable<any> = this.actions$.pipe(
//         ofType(actionsProvinces.updateProvince),
//         switchMap(({province}) => this._provinceService.updateProvince(province).pipe(
//             map((province) => {
//                 return actionsProvinces.updateProvinceSuccess()
//             }),
//             catchError( (err) => {
//                 return of( actionsProvinces.updateProvinceError({error:err.message}) )
//             })
//         )),
//     )

//     @Effect()
//     createProvinceSuccess: Observable<any> = this.actions$.pipe(
//         ofType(actionsProvinces.createProvinceSuccess),
//         switchMap( () => of( actionsProvinces.loadProvinces() )),
//         tap( _=>this._provinceService.closeModalCreateUpdate()
//     ))

//     @Effect()
//     updateProvinceSuccess: Observable<any> = this.actions$.pipe(
//         ofType(actionsProvinces.updateProvinceSuccess),
//         switchMap( () => of( actionsProvinces.loadProvinces() )),
//         tap( _=>this._provinceService.closeModalCreateUpdate()
//     ))

//     @Effect({dispatch : false})
//     openModalCreateUpdate = this.actions$.pipe(
//         ofType(actionsProvinces.openModalCreateUpdate),
//         tap(({province}) => 
//             this._provinceService.openModalCreateUpdate(province)
//         ))

//     @Effect()
//     openModalConfirmation = this.actions$.pipe(
//         ofType(actionsProvinces.openModalConfirmation),
//         exhaustMap(({province}) => 
//             this._provinceService.showConfirm().pipe(
//                 map(() => actionsProvinces.deleteProvince({province})),
//                 catchError(() => of(actionsProvinces.deleteProvinceCancel()))
//         ))
//     )

//     @Effect()
//     deleteProvince = this.actions$.pipe(
//         ofType(actionsProvinces.deleteProvince),
//         exhaustMap(({province}) => 
//             this._provinceService.deleteProvince(province).pipe(
//                 map(() => actionsProvinces.deleteProvinceSuccess()),
//                 catchError((err) => of(actionsProvinces.deleteProvinceError({error:err.message})))
//         ))
//     )
// }



// // @Effect({dispatch:false})
// // loadProvinces: Observable<any>= this.actions$.pipe(
// //     ofType(actionsProvinces.loadProvinces),
// //     switchMap(() => this._provinceService.getProvinces().pipe(
// //         map((provinces) => {
// //             return actionsProvinces.loadProvincesSuccess({provinces})
// //         }),
// //         catchError( (err) => {
// //             return of( actionsProvinces.loadProvincesError({error:err.message}) )
// //         })
// //     )),
// // )
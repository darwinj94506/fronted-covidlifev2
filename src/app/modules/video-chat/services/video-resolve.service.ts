import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { VerSeguimientoDetalleUseCase } from '../../../core/usecases';
import { SeguimientoEstadoEnum } from '../../../core/domain/enums';
import { ConsultarUnSeguimientoOut } from '../../../core/domain/outputs';
import { mergeMap, catchError, take } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';
import { ToastService } from '../../../services';
import { NgxSpinnerService } from 'ngx-spinner';
@Injectable({providedIn:'root'})
export class VideoResolveService implements Resolve<any>{
    constructor(
        private _toastService: ToastService, 
        private _spinner: NgxSpinnerService,
        private _verSeguimientoDetalleUseCase: VerSeguimientoDetalleUseCase ){}

    resolve(route: ActivatedRouteSnapshot){
        this._spinner.show();
        const id = route.paramMap.get('id');
        console.log(id);
        return this._verSeguimientoDetalleUseCase.execute(id).pipe(
            take(1),
            mergeMap( data =>{
                this._spinner.hide();
                console.log(data);
                if(data.estado && data.estado === SeguimientoEstadoEnum.AGENDADO){
                    console.log("navega a video");
                    return of(data)
                }
                else {
                  
                    history.back()
                    this._toastService.showError("Esta cita ya fue atendida");
                    return EMPTY
                }
            }),
            catchError(err=>{
                this._spinner.hide();
                history.back()
                this._toastService.showError("Error al cargar cita");
                return of(err)
            }))
    }
}
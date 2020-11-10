import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { VerResumenSeguimientosPacienteUseCase } from '../../../core/usecases/doctor';
import { RolesUserEnum } from '../../../core/domain/enums';
import { mergeMap, catchError, take } from 'rxjs/operators';
import { of, EMPTY, from } from 'rxjs';
import { ToastService } from '../../../services';
import { NgxSpinnerService } from 'ngx-spinner';
@Injectable({providedIn:'root'})
export class HistorialResolveService implements Resolve<any>{
    constructor(
        private _toastService: ToastService, 
        private _spinner: NgxSpinnerService,
        private _verResumenSeguimientosPacienteUseCase: VerResumenSeguimientosPacienteUseCase ){}

    resolve(route: ActivatedRouteSnapshot){
        this._spinner.show();
        
        const idPaciente = route.paramMap.get('user');
        const rol = route.paramMap.get('rol');
        if(rol === RolesUserEnum.PACIENTE)
            return of({data:[]});

        return this._verResumenSeguimientosPacienteUseCase.execute({idPaciente}).pipe(
            take(1),
            mergeMap( data =>{
                this._spinner.hide();
                console.log(data);
                return of({data})
            }),
            catchError(err=>{
                this._spinner.hide();
                history.back()
                this._toastService.showError("Error al cargar Historial del paciente. error:"+err.message);
                return of(err)
            }))
    }
}

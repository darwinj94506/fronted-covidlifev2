import { Injectable } from '@angular/core';
import { Actions, Effect, ofType  } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, exhaustMap, tap } from 'rxjs/operators';
import * as accionesEspacio  from '../actions/espacio.actions';
import { EspacioService } from '../../services'
import { Observable, from} from 'rxjs'; 
import { GestionarEspacioCaseUse,
         VerLugaresPorTipoCaseUse } from '../../../../core/usecases/root';
import { CRUDEnum } from '../../../../core/domain/enums';

@Injectable()
export class EspacioEffects {

    constructor( private actions$: Actions , 
        private _gestionarEspacio: GestionarEspacioCaseUse,
        private _verLugaresPorTipo: VerLugaresPorTipoCaseUse,
        private _espacioService: EspacioService
        ) { }

    @Effect()
    loadEspacio: Observable<any> = this.actions$.pipe(
    ofType(accionesEspacio.cargarEspacios),
    switchMap(payload => this._verLugaresPorTipo.execute(payload.tipo, payload.idTipo)
        .pipe(
            map(espacios => accionesEspacio.cargarEspacioExito({espacios:espacios, tipo :payload.tipo})),
            catchError( error => {
                alert(`Error al cargar entidades de tipo: ${payload.tipo}, Error:${error.message}`);
                return of( accionesEspacio.cargarEspacioError({error: error.message, tipo: payload.tipo}))
                }
            )
        )))

    @Effect()
    createEspacio: Observable<any> = this.actions$.pipe(
        ofType(accionesEspacio.crearEspacio),
        exhaustMap(({Espacio}) => this._gestionarEspacio.execute(Espacio,CRUDEnum.CREATE).pipe(
            map((Espacio) => {
                alert(`Éxito, entidad creada: ${Espacio.nombre}`)
                this._espacioService.closeModalCreateUpdate()
                return accionesEspacio.crearEspacioExito({Espacio})
            }),
            catchError( (error) => {
                alert(`Error al crear, Error:${error.message}, Entidad:${Espacio.nombre}`)
                return of( accionesEspacio.crearEspacioError({error: error.message, Espacio}) )
            })
        )),
    )

    @Effect()
    actualizarEspacio: Observable<any> = this.actions$.pipe(
        ofType(accionesEspacio.actualizarEspacio),
        switchMap(({Espacio}) => this._gestionarEspacio.execute(Espacio,CRUDEnum.UPDATE).pipe(
            map((Espacio) => {
                alert(`Éxito, entidad actualizada: ${Espacio.nombre}`);
                this._espacioService.closeModalCreateUpdate();
                return accionesEspacio.actualizarEspacioExito({Espacio});
            }),
            catchError(error => {
                alert(`Error al actualizar, Error:${error.message}, Entidad:${Espacio.nombre}`);
                return of( accionesEspacio.actualizarEspacioError({error: error.message, Espacio}) );
            })
        )),
    )

    @Effect({dispatch : false})
    openModalCreateUpdate = this.actions$.pipe(
        ofType(accionesEspacio.abrirModalCreateUpdate),
        tap(({ Espacio }) => 
            this._espacioService.openModalCreateUpdate(Espacio)
        ))

    @Effect()
    openModalConfirmation = this.actions$.pipe(
        ofType(accionesEspacio.abrirModalConfirmacon),
        exhaustMap(({Espacio}) => 
            this._espacioService.showConfirm().pipe(
                map(() => accionesEspacio.eliminarEspacio({Espacio})),
                catchError(() => of(accionesEspacio.eliminarEspacioCancelar()))
        ))
    )

    @Effect()
    deleteProvince = this.actions$.pipe(
        ofType(accionesEspacio.eliminarEspacio),
        exhaustMap(({Espacio}) => 
            this._gestionarEspacio.execute(Espacio, CRUDEnum.DELETE).pipe(
                map(() => {
                        alert(`Éxito, entidad eliminada: ${Espacio.nombre}`)
                        accionesEspacio.eliminarEspacioExito({Espacio})
                    }),
                catchError((error) => {
                    alert(` Error al eliminar,  Error: ${error.message}, Entidad: ${Espacio.nombre}`)
                    return of(accionesEspacio.eliminarEspacioError({ error, Espacio }))
                })
        ))
    )
}

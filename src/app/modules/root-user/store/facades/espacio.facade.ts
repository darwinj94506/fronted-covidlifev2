import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as accionesEspacios from '../actions/espacio.actions';
import { AppState, 
         selectCargandoProvincias,
         selectCargandoCantones,
         selectCargandoParroquias,
         selectProvincias,
         selectCantones,
         selectParroquias,
         selectBarrios,
         selectCargandoBarrios 
        } from '../root-user.reducer';
import { EspacioEnum } from '../../../../core/domain/enums';
import { IEspacioEntity } from '../../../../core/domain/entities/espacio-entity';
@Injectable({
  providedIn: 'root'
})
export class EspacioFacade {
  constructor(private store: Store<AppState>) {}

  cargarEspacios(tipo:EspacioEnum, idTipo:string | number ) {
    this.store.dispatch(accionesEspacios.cargarEspacios({tipo:tipo, idTipo:idTipo}));
  }

  getLoadingProvincias(): Observable<boolean>{
    return this.store.select(selectCargandoProvincias)
  }

  getLoadingCantones(): Observable<boolean>{
    return this.store.select(selectCargandoCantones)
  }
  getLoadingParroquias(): Observable<boolean>{
    return this.store.select(selectCargandoParroquias)
  }
  getLoadingBarrios(): Observable<boolean>{
    return this.store.select(selectCargandoBarrios)
  }


  getProvincias(): Observable<IEspacioEntity[]>{
    return this.store.select(selectProvincias)
  }

  getCantones(): Observable<IEspacioEntity[]>{
    return this.store.select(selectCantones)
  }

  getParroquias(): Observable<IEspacioEntity[]>{
    return this.store.select(selectParroquias)
  }

  getBarrios(): Observable<IEspacioEntity[]>{
    return this.store.select(selectBarrios)
  }

  public crearEspacio(Espacio: IEspacioEntity): void {
    this.store.dispatch(
      accionesEspacios.crearEspacio({Espacio})
    );
  }

  public actualizarEspacio(Espacio: IEspacioEntity): void{
    this.store.dispatch(
      accionesEspacios.actualizarEspacio({Espacio})
    );
  }

  public abriModalCrear_Actualizar(Espacio: IEspacioEntity): void{
    this.store.dispatch(
      accionesEspacios.abrirModalCreateUpdate({Espacio})
    )
  }

  public abriModalConfirmacion(Espacio: IEspacioEntity): void {
    this.store.dispatch(
      accionesEspacios.abrirModalConfirmacon({Espacio})    )
  }
  
}
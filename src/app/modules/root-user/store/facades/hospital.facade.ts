import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as accionesHospitales from '../actions/hospital.actions';
import { AppState, 
         selectHospitales,
         selectCargandoHospitales } from '../root-user.reducer';
import { IHospitalEntity } from '../../../../core/domain/entities';
import { FilterHospitalIn } from '../../../../core/domain/inputs';
@Injectable({
  providedIn: 'root'
})
export class HospitalFacade {
  constructor(private store: Store<AppState>) {}

  cargarHospitales( filter: FilterHospitalIn) {
    this.store.dispatch(accionesHospitales.cargarHospitales({filter}));
  }

  getLoadingHospitales(): Observable<boolean>{
    return this.store.select(selectCargandoHospitales)
  }
  
  getHospitales(): Observable<IHospitalEntity[]>{
    return this.store.select(selectHospitales)
  }

  public crearHospital(Hospital: IHospitalEntity): void {
    this.store.dispatch(
      accionesHospitales.crearHospital({Hospital})
    );
  }

  public actualizarHospital(Hospital: IHospitalEntity): void{
    this.store.dispatch(
      accionesHospitales.actualizarHospital({Hospital})
    );
  }

  public abriModalCrear_Actualizar(Hospital: IHospitalEntity): void{
    this.store.dispatch(
      accionesHospitales.abrirModalCreateUpdate({Hospital})
    )
  }

  public abriModalConfirmacion(Hospital: IHospitalEntity): void {
    this.store.dispatch(
      accionesHospitales.abrirModalConfirmacion({Hospital}))
  }
  
}
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as accionesHospitales from '../actions/hospital.actions';
import { AppState, 
         selectHospitales,
         selectCargandoHospitales } from '../root-user.reducer';
import { IHospitalEntity } from '../../../../core/domain/entities';
@Injectable({
  providedIn: 'root'
})
export class HospitalFacade {
  constructor(private store: Store<AppState>) {}

  cargarHospitales( idEspacio: string | number ) {
    this.store.dispatch(accionesHospitales.cargarHospitales({idEspacio: idEspacio}));
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
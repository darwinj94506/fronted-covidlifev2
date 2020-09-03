import { Component, OnInit,Input, OnDestroy } from '@angular/core';
import { IHospitalEntity } from '../../../../../core/domain/entities';
import { FilterHospitalIn } from '../../../../../core/domain/inputs';
import { HospitalFacade } from '../../../store/facades';
import  { Observable, Subscription } from 'rxjs';
import { NgxSpinnerService } from  'ngx-spinner';
@Component({
  selector: 'app-tabla-hospitales',
  templateUrl: './tabla-hospitales.component.html',
  styleUrls: ['./tabla-hospitales.component.css']
})
export class TablaHospitalesComponent implements OnInit, OnDestroy {
  
subscription: Subscription;
subscriptionLoading: Subscription;
isLoading$: boolean = false; 

hospitales = [];
  constructor(private _hospitalFacade: HospitalFacade,private _spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    let filter: FilterHospitalIn = {}
    this._hospitalFacade.cargarHospitales(filter);
    this.initListener();
  }

  openModalCreateUpdate(data: IHospitalEntity) {
    let hospital: IHospitalEntity;
    if(!data)
       hospital = { nombre: '', description:'', idEspacio:'' }
    else
       hospital = data
    this._hospitalFacade.abriModalCrear_Actualizar(hospital)
  }
  
  openModalConfirm(hospital:IHospitalEntity){
    this._hospitalFacade.abriModalConfirmacion(hospital);
  }
 
  initListener(){
    this.subscription= this._hospitalFacade.getHospitales()
      .subscribe(hospitales => this.hospitales=hospitales);
      
    this.subscriptionLoading = this._hospitalFacade.getLoadingHospitales()
      .subscribe(isLoading=> {
        if(isLoading) this._spinner.show();
        else this._spinner.hide();  
    })

  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.subscriptionLoading.unsubscribe();
  }
}

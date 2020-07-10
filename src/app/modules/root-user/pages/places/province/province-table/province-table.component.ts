import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProvinceFacade } from '../../../../store/facades/province.facade';
import { map, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-province-table',
  templateUrl: './province-table.component.html'
})
export class ProvinceTableComponent implements OnInit, OnDestroy{

  public provinces : any[] = [];
  public isLoading = false;
  public errorMessage = ""
  public newProvince = {
    _id:'',
    name: ''
  }
 
  suscription : Subscription; 
  page = 1;
  pageSize = 7;

  constructor( private _provinceFacade: ProvinceFacade ) { }

  ngOnInit(): void {
    this.initStore();
  }

  ngOnDestroy():void {
    this.suscription.unsubscribe()
  }
  
  initStore(){
    this._provinceFacade.loadProvinces();
    this.suscription = this._provinceFacade.getProvinceList().pipe(
      tap(console.log))
      // map(({province})=>({...province})))
      .subscribe( (store:any) => {
        console.log(store);
        this.provinces = store.provinces;
        this.errorMessage = store.error;
        this.isLoading = store.isLoading;     
      })
  }

  openModalCreateUpdate(province) {
    this._provinceFacade.openModalCreateUpdate(province)
  }

  openModalConfirm(province){
    this._provinceFacade.openModalConfirmation(province)
  }



}

import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SeguimientoCompletoPacienteOut, SeguimientoSegCompOut} from '../../../../core/domain/outputs';

import { SeguimientoCompletoPacienteIn } from '../../../../core/domain/inputs';
import { Observable, Subscription } from 'rxjs';
import { SeguimientoFacade } from '../../../../store/facade';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { VerResumenSeguimientosPacienteUseCase } from '../../../../core/usecases/doctor';
import { NgxSpinnerService } from 'ngx-spinner';
import _ from 'lodash';
interface tablaResumen{
   fecha: SeguimientoSegCompOut []
}

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.css']
})
export class TimeLineComponent implements OnInit, OnDestroy {
  suscription: Subscription;
  modalSeguimiento: NgbModalRef;
  @Input() idPaciente: String;
  seguimientos$ : Observable<SeguimientoCompletoPacienteOut[]>;
  seguimientosSinProcesar : SeguimientoCompletoPacienteOut[];
  seguimientos: any [] = [] ;
  isLoading$: Observable<boolean>;
  constructor(private _seguimientoFacade: SeguimientoFacade,
    private _spinner:NgxSpinnerService,
    private _verResumenSeguimientosPacienteUseCase:VerResumenSeguimientosPacienteUseCase, 
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.isLoading$ = this._seguimientoFacade.getIsLoadingSeguimientosCompletosFromStore();
    this.suscription = this._seguimientoFacade.getSeguimientosCompletosFromStore()
      .subscribe(data=>{
        this.seguimientosSinProcesar = data;
        this.reporte()
      })
    this.loadSeguimientosCompletos(this.idPaciente);
   //  this.reporte();
  }
  ngOnDestroy(){
    this.suscription.unsubscribe();
  }
  
  loadSeguimientosCompletos(idPaciente:String){
    let params: SeguimientoCompletoPacienteIn = { idPaciente }
    this._seguimientoFacade.dispatchActionLoadSeguimientosCompletos(params);
  }

  open(seguimiento: SeguimientoSegCompOut) {
      this.modalSeguimiento = this.modalService.open(NgbdModal1Content, { scrollable: true });
      this.modalSeguimiento.componentInstance.seguimiento = {...seguimiento, data: null, soloVer: true};
  }

  cortar(str: String){
    if(str)
      return str.length > 10 ? str.slice(0,10)+'...' : str
    else
      return ''  
  }
  // funciones para ver cuando un paciente esta en cuarentena
  // reporte(){
  //   let filtrado = _.chain(this.seguimientosSinProcesar)
  //   .flatMap(i=>i.seguimientos)
  //   .map(item=>({...item,
  //           desde_hasta: this.concatFechas(item.aislamiento_desde,item.aislamiento_hasta),
  //           aislamiento_desde: this.transformDate(item.aislamiento_desde)?(this.transformDate(item.aislamiento_desde)): null,
  //           aislamiento_hasta: this.transformDate(item.aislamiento_hasta)?(this.transformDate(item.aislamiento_hasta)): null,
  //           createAt: this.transformDate(item.createAt),
  //           createAtCeroHoras: new Date(this.transformDate(item.createAt).getFullYear(),this.transformDate(item.createAt).getMonth(),this.transformDate(item.createAt).getDate(),0,0,0),
  //           createAtString: this.transformDate(item.createAt).toLocaleDateString() 
  //           }
  //       )).value();
  //   let fechas = this.getFechasEnCuarentena(Object.keys(_.groupBy(filtrado,i=>i.desde_hasta)));
  //   let final = _.chain(filtrado)
  //   .map(i=>({...i, enCuarenta: this.enCuanrentena(fechas,i)}))
  //   .groupBy(i=>i.createAtString)
  //   .value();
  //   console.log(final);
  //   this.seguimientos = [];
  //   (Object.keys(final)).forEach(i=>{
  //     let obj = { _id: i, seguimientos: final[i]};
  //     this.seguimientos.push(obj);
  //   })
  // }

  reporte(){
    let filtrado = _.chain(this.seguimientosSinProcesar)
    .flatMap(i=>i.seguimientos)
    .map(item=>({...item,
            desde_hasta: this.concatFechas(item.aislamiento_desde,item.aislamiento_hasta),
            aislamiento_desde: (item.aislamiento_desde)?(this.transformDate(item.aislamiento_desde)): null,
            aislamiento_hasta: (item.aislamiento_hasta)?(this.transformDate(item.aislamiento_hasta)): null,
            createAt: this.transformDate(item.createAt),
            createAtCeroHoras:this.setTimeToZero(this.transformDate(item.createAt)), 
            createAtString: this.transformDate(item.createAt).toLocaleDateString() 
            }
        )).value();
    let fechas = this.getRealDates(this.getFechasEnCuarentena(Object.keys(_.groupBy(filtrado,i=>i.desde_hasta))));
    let final = _.chain(filtrado)
    .map(i=>({...i, enCuarenta: this.enCuanrentena(fechas,i)}))
    .groupBy(i=>i.createAtString)
    .value();
    this.seguimientos = [];
    (Object.keys(final)).forEach(i=>{
      let obj = { _id: i, seguimientos: final[i]};
      this.seguimientos.push(obj);
    }) 
    // console.log(JSON.stringify(ordered, null, 4));
  }

getFechasEnCuarentena(fechas){
    let arrayFechas = [];
    _.forEach(fechas,i=>{
      if(i!="null"){
          arrayFechas.push({ desde: new Date(i.split('/')[0]), hasta: new Date(i.split('/')[1]) })
       }
    })
    return arrayFechas
  }

  enCuanrentena(fechas, seguimiento){
   let cuarentena = false;
     for(let i=0;i<fechas.length; i++){
         if(seguimiento.createAtCeroHoras >= fechas[i].desde && seguimiento.createAtCeroHoras <= fechas[i].hasta){
             cuarentena = true;
             break;
         } 
     }
   return cuarentena;
 }

concatFechas(fecha1, fecha2){
  if(fecha1!=null && fecha1 != undefined){
      let f1 = this.setTimeToZero(this.transformDate(fecha1));
      let f2 = this.setTimeToZero(this.transformDate(fecha2));
      return `${f1}/${f2}`
  }
  return null;
}

getRealDates(arrayDesdeHasta){
  for(let i=0; i < arrayDesdeHasta.length; i++){
     for(let j=i+1; j< arrayDesdeHasta.length; j++){
        if(JSON.stringify(arrayDesdeHasta[i].desde) === JSON.stringify(arrayDesdeHasta[j].desde)){
           if(arrayDesdeHasta[i].hasta < arrayDesdeHasta[j].hasta){
              arrayDesdeHasta.splice(j,1);
           }else{
              arrayDesdeHasta.splice(i,1);
           }
        }
     }
  }
  return arrayDesdeHasta;
}

setTimeToZero(date){
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  return date
}

transformDate(t){
  let today = new Date(t);
  return new Date(
      today.getFullYear(), today.getUTCMonth(), today.getUTCDate(),
      today.getUTCHours(), today.getUTCMinutes(), today.getUTCSeconds())
}

}

@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Seguimiento</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <app-atender-seguimiento [seguimiento]="seguimiento"></app-atender-seguimiento>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Cerrar</button>
    </div>
  `
})
export class NgbdModal1Content {
  @Input() seguimiento;   
  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) {}
}


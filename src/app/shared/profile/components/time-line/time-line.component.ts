import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SeguimientoCompletoPacienteOut } from '../../../../core/domain/outputs';
import { SeguimientoCompletoPacienteIn } from '../../../../core/domain/inputs';
import { Observable, Subscription } from 'rxjs';
import { SeguimientoFacade } from '../../../../store/facade';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import _ from 'lodash';
import { Z_DATA_ERROR } from 'zlib';
@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.css']
})
export class TimeLineComponent implements OnInit, OnDestroy {
  suscription:Subscription;
  modalSeguimiento: NgbModalRef;
  @Input() idPaciente: String;
  seguimientos$ : Observable<SeguimientoCompletoPacienteOut[]>;
  seguimientos : SeguimientoCompletoPacienteOut[];
  isLoading$: Observable<boolean>;
  constructor(private _seguimientoFacade: SeguimientoFacade, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.isLoading$ = this._seguimientoFacade.getIsLoadingSeguimientosCompletosFromStore();
    this.seguimientos$ = this._seguimientoFacade.getSeguimientosCompletosFromStore()
    // this.suscription = this._seguimientoFacade.getSeguimientosCompletosFromStore()
    //   .subscribe(data=>{
    //     this.ordenar(data);
    //   })
    this.loadSeguimientosCompletos(this.idPaciente);
  }
  ngOnDestroy(){
    // this.suscription.unsubscribe();
  }
  ordenar(seguimientos: SeguimientoCompletoPacienteOut[]){
    seguimientos.forEach(data=>{
      data.seguimientos.map(i=>({...i, createAt:this.transformDate(i.createAt)}));
      data.seguimientos = _.orderBy(data.seguimientos, seg => seg.createAt)
    });
    this.seguimientos = seguimientos;
  }

  loadSeguimientosCompletos(idPaciente:String){
    let params: SeguimientoCompletoPacienteIn = { idPaciente }
    this._seguimientoFacade.dispatchActionLoadSeguimientosCompletos(params);
  }

  transformDate(t){
    let today = new Date(t);

    return new Date(
      today.getFullYear(), today.getMonth(), today.getUTCDate(),
      today.getUTCHours(), today.getUTCMinutes(), today.getUTCSeconds())
  }
  
  open(seguimiento) {
      this.modalSeguimiento = this.modalService.open(NgbdModal1Content,{ scrollable: true });
      this.modalSeguimiento.componentInstance.seguimiento = {...seguimiento};
  }

  cortar(str: String){
    if(str)
      return str.length > 10 ? str.slice(0,10)+'...' : str
    else
      return ''  
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


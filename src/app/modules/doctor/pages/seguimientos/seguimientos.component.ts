import { Component, OnInit, OnDestroy} from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { Observable, forkJoin, Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FiltrarSeguimientoOut, AtenderSolicitudSeguimientoOut,LoginOut } from '../../../../core/domain/outputs';
import { FiltrarSeguimientoIn, IdIn, AtenderSolicitudSeguimientoIn, AgendarSolicitudSeguimientoIn } from '../../../../core/domain/inputs';
import { SeguimientoEstadoEnum, DiagnosticoActualEnum} from '../../../../core/domain/enums';
import { MainFacade, UserFacade, SeguimientoFacade } from '../../../../store/facade';
import { Apollo, QueryRef } from 'apollo-angular';
import { SEGUIMIENTO_OPERATIONS } from '../../../../data/graphq';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

interface args {
  name: string;
  el: Element;
  target: Element;
  source: Element;
  sibling: Element;
  item: FiltrarSeguimientoOut;
  sourceModel: FiltrarSeguimientoOut[];
  targetModel: FiltrarSeguimientoOut[];
}

@Component({
  selector: 'app-seguimientos',
  templateUrl: './seguimientos.component.html',
  styleUrls: ['./seguimientos.component.css']
})
export class SeguimientosComponent implements OnInit, OnDestroy {
  segQuery: QueryRef<any>;
  seguimientos:Observable<any>;
  
  segSinLlamada = [];
  segConLlamada = [];
  segAtendidos = [];
  segAgendados = [];
  userLogged: LoginOut;

  

  constructor(
     private dragulaService: DragulaService,
     private apollo: Apollo,
     private _mainFacade: MainFacade,
     private _spinner: NgxSpinnerService,
     private _userFacade: UserFacade,
     private _seguimientoFacade:SeguimientoFacade,
     private _router:Router

     ) {
    this.dragulaService.destroy('SEGUIMIENTOS');
    this.dragulaService.createGroup("SEGUIMIENTOS", {});
    this.dragulaService.dropModel("SEGUIMIENTOS").subscribe(args => {
      this.makeAction(args);  
    });
 

    forkJoin(this._mainFacade.getHospitalSesion(),this._mainFacade.getUserLogged())
      .subscribe(([hospital, userLogged])=>{
        this.userLogged = userLogged;
        let filter : FiltrarSeguimientoIn = { 
          fechaUltimos :{
            isUltimos:true,
            createAt: new Date(),
            AndIdHospital: hospital.idHospital._id
          }
        }
        this.segQuery = this.apollo.watchQuery({
          query: SEGUIMIENTO_OPERATIONS.filter.gql,
          variables: {
            data: filter
          }
        });  
        this.seguimientos = this.segQuery.valueChanges;
    })
   
  }
 
  ngOnInit(){
    this.subscribeToSeguimientos();
    this.seguimientos.subscribe(response => {
      this.segSinLlamada = [];
      this.segConLlamada = [];
      this.segAgendados = [];
      this.segAtendidos = [];
      
      if(response.data.loading) this._spinner.show();
      if(!response.data.loading) this._spinner.hide();
      console.log(response);
      response.data.filterSeguimiento.forEach((seguimiento : FiltrarSeguimientoOut) => {
        switch (seguimiento.estado){
          case SeguimientoEstadoEnum.SOLICITADO_SIN_LLAMADA:
            this.segSinLlamada.push(seguimiento);
          break;
          case SeguimientoEstadoEnum.SOLICITADO_CON_LLAMADA:
            this.segConLlamada.push(seguimiento);
          break;
          case SeguimientoEstadoEnum.AGENDADO:   
            this.segAgendados.push(seguimiento);
          break;
          case SeguimientoEstadoEnum.REVISADO_CON_LLAMADA:
            this.segAtendidos.push(seguimiento);
          break;
          case SeguimientoEstadoEnum.REVISADO_SIN_LLAMADA:
            this.segAtendidos.push(seguimiento);
          break;
        } 
      });
    });
  }
  
  ngOnDestroy(){
    // this._destroyed$.next();
    // this._destroyed$.complete();
  }

  subscribeToSeguimientos() {
    this.segQuery.subscribeToMore({
      document: SEGUIMIENTO_OPERATIONS.suscription.gql,
      updateQuery: (prev, {subscriptionData}) => {
        if (!subscriptionData.data) {
          return prev;
        }
 
        const newDataQuery = this.getDataForUpdateGrapqlQuery(subscriptionData.data.cambioSeguimientoNotificacion, prev.filterSeguimiento)

        return {
          ...prev,
          filterSeguimiento: [...newDataQuery]
        };
      }
    });
  }

  getDataForUpdateGrapqlQuery(entrySeguimiento: FiltrarSeguimientoOut, previousSeguimientos: FiltrarSeguimientoOut []): FiltrarSeguimientoOut[]{
    let index = previousSeguimientos.findIndex(item=>item._id === entrySeguimiento._id)
    if(index === -1)
      return [entrySeguimiento, ...previousSeguimientos]
    
    previousSeguimientos[index] = {...entrySeguimiento}
    return [...previousSeguimientos]
  }

  showModalAtencion(seguimiento:FiltrarSeguimientoOut) {
    this._userFacade.openModalPerfil(seguimiento)
  }

   makeAction(args: args){
     console.log(args.item);
    switch(args.target.getAttribute('id')){
      case 'segAgendados':
        
        this._seguimientoFacade.agendarSeguimiento(args.item, this.userLogged)
      break;
      
      case 'segAtendidos':
        let seguimientoForAtender : AtenderSolicitudSeguimientoIn = {
            _id: args.item._id
        }
        this._seguimientoFacade.atenderSeguimiento(seguimientoForAtender)
      break;
    }
  }

  goToVideoCalling(seguimiento:FiltrarSeguimientoOut){
    this._seguimientoFacade.
      dispatchActionSendNotificationVideoLlamada(seguimiento, this.userLogged)
    this._router.navigate(['/video-llamada'], {state: {data: {...seguimiento}}});
  }
}

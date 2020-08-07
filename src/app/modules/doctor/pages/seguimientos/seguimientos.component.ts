import { Component, OnInit, OnDestroy} from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { Observable, forkJoin, Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FiltrarSeguimientoOut, AtenderSolicitudSeguimientoOut } from '../../../../core/domain/outputs';
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
    this.seguimientos.subscribe(data => {
      let conLlamada = [];
      let sinLlamda = [];
      let agendados = [];
      let atendidos = []; 
      if(data.loading) this._spinner.show();
      if(!data.loading) this._spinner.hide();
      console.log(data);
      data.data.filterSeguimiento.forEach((seguimiento : FiltrarSeguimientoOut) => {
        switch (seguimiento.estado){
          case SeguimientoEstadoEnum.SOLICITADO_SIN_LLAMADA:
            sinLlamda.push(seguimiento);
          break;
          case SeguimientoEstadoEnum.SOLICITADO_CON_LLAMADA:
            conLlamada.push(seguimiento);
          break;
          case SeguimientoEstadoEnum.AGENDADO:   
          agendados.push(seguimiento);
          break;
          case SeguimientoEstadoEnum.REVISADO_CON_LLAMADA:
            atendidos.push(seguimiento);
          break;
          case SeguimientoEstadoEnum.REVISADO_SIN_LLAMADA:
            atendidos.push(seguimiento);
          break;
        } 
      });
      this.segAgendados = agendados;
      this.segConLlamada = conLlamada;
      this.segSinLlamada = sinLlamda;
      this.segAtendidos = atendidos;
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
        console.log([subscriptionData, prev]);
        const segAdd = subscriptionData.data.cambioSeguimientoNotificacion;
        return {
          ...prev,
          filterSeguimiento: [segAdd, ...prev.filterSeguimiento]
        };
      }
    });
  }

  showModalAtencion(seguimiento:FiltrarSeguimientoOut) {
    this._userFacade.openModalPerfil(seguimiento)
  }

   makeAction(args: args){
     console.log(args.item);
    switch(args.target.getAttribute('id')){
      case 'segAgendados':
        let seguimientoForAgendar: AgendarSolicitudSeguimientoIn = {
          _id:args.item._id
        } 
        this._seguimientoFacade.agendarSeguimiento(seguimientoForAgendar, args.item.idPaciente.token_notificacion_movil)
      break;
      
      case 'segAtendidos':
        let seguimientoForAtender : AtenderSolicitudSeguimientoIn = {
            _id: args.item._id
        }
        this._seguimientoFacade.atenderSeguimiento(seguimientoForAtender)
      break;
    }
  }

  goToVideoCalling(seguimiento){
    this._router.navigate(['/video-llamada'], {state: {data: {...seguimiento}}});
  }

}

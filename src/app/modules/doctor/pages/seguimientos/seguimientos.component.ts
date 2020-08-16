import { Component, OnInit, OnDestroy} from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { Observable, forkJoin, Subject} from 'rxjs';
import { takeUntil, map} from 'rxjs/operators';
import { FiltrarSeguimientoOut, 
         AtenderSolicitudSeguimientoOut,
         VORoleHospitalPopulateLoginOut,
         ItemDragula,
         LoginOut } from '../../../../core/domain/outputs';
import { FiltrarSeguimientoIn, 
         IdIn, 
         AtenderSolicitudSeguimientoIn,
         CrearNotificacionIn, 
         AgendarSolicitudSeguimientoIn } from '../../../../core/domain/inputs';
import { SeguimientoEstadoEnum, 
         DiagnosticoActualEnum} from '../../../../core/domain/enums';
import { VerSeguimientosAgendadosUseCase,
         VerSeguimientosAtendidosUseCase,
         VerSeguimientosNoAtendidosSinLLamadaUseCase,
         VerSeguimientosNoAtendidosConLLamadaUseCase
} from '../../../../core/usecases/doctor';

import { MainFacade, UserFacade, SeguimientoFacade } from '../../../../store/facade';
import { Apollo, QueryRef } from 'apollo-angular';
import { SEGUIMIENTO_OPERATIONS } from '../../../../data/graphq';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { SuscriptionService } from '../../../../services';
@Component({
  selector: 'app-seguimientos',
  templateUrl: './seguimientos.component.html',
  styleUrls: ['./seguimientos.component.css']
})
export class SeguimientosComponent implements OnInit, OnDestroy {
  // segQueryRef: QueryRef<any>;
  // seguimientos:Observable<any>;
  userLogged: LoginOut;
  private _destroyed$ = new Subject();
  
  segSinLlamada = [];
  segConLlamada = [];
  segAtendidos = [];
  segAgendados = [];
  
  segAgendados$: Observable<FiltrarSeguimientoOut[]>;
  segSinLlamada$ : Observable<FiltrarSeguimientoOut[]>;
  segConLlamada$ : Observable<FiltrarSeguimientoOut[]>;
  segAtendidos$ : Observable<FiltrarSeguimientoOut[]>;

  segSinLlamadaQueryRef: QueryRef<any>;
  segConLlamadaQueryRef: QueryRef<any>;
  segAgendadosQueryRef: QueryRef<any>;
  segAtendidosQueryRef: QueryRef<any>;
  constructor(
     private dragulaService: DragulaService,
     private _mainFacade: MainFacade,
     private _userFacade: UserFacade,
     private _seguimientoFacade: SeguimientoFacade,
     private _router: Router,
     private _suscriptionService:SuscriptionService,  

     ) {
    this.dragulaService.destroy('SEGUIMIENTOS');
    this.dragulaService.createGroup("SEGUIMIENTOS", {});
    this.dragulaService.dropModel("SEGUIMIENTOS").pipe(takeUntil(this._destroyed$)).subscribe(args => {
      this.makeAction(args);  
    });
 
    forkJoin(this._mainFacade.getHospitalSesion(),this._mainFacade.getUserLogged())
      .subscribe(([hospital, userLogged])=>{
        this.userLogged = userLogged;
        this.querySinLlamada(hospital)
        this.queryConLlamada(hospital);
        this.queryAgendados(hospital, userLogged);
        this.queryAtendidos(hospital, userLogged);
      })
  }
 
  ngOnInit(){
    this.subscribeToSeguimientosSinLlamada();
    this.subscribeToSeguimientosConLlamada();
    this.subscribeToSeguimientosAgendadas();
    this.subscribeToSeguimientosAtendidos();
    this.segSinLlamada$.pipe(takeUntil(this._destroyed$)).subscribe(response=>{
      
      this.segSinLlamada = [];
      console.log(response);
      this.segSinLlamada = response;
    })

    this.segConLlamada$.pipe(takeUntil(this._destroyed$)).subscribe(response=>{
      this.segConLlamada = [];
      console.log(response);
      this.segConLlamada= response;
    })

    this.segAgendados$.pipe(takeUntil(this._destroyed$)).subscribe(response=>{
      this.segAgendados = [];
      console.log(response);
      this.segAgendados= response;
    })

    this.segAtendidos$.pipe(takeUntil(this._destroyed$)).subscribe(response=>{
      this.segAtendidos = [];
      console.log(response);
      this.segAtendidos= response;
    })

  }
  
  ngOnDestroy(){
    this._destroyed$.next();
    this._destroyed$.complete();
  }


  queryAgendados(hospital: VORoleHospitalPopulateLoginOut, userLogged: LoginOut){
    let date=new Date();
    date.setHours(0,0,0);
    let filter:FiltrarSeguimientoIn = {  fechaUltimos: 
      { createAt: date,
        isUltimos: false, 
        AndIdHospital: hospital.idHospital._id,
        AndIdDoctor: userLogged._id,
        AndEstado: SeguimientoEstadoEnum.AGENDADO 
      }
    }
    this.segAgendadosQueryRef = this._suscriptionService.filterSeguimiento(filter);
    this.segAgendados$ = this.segAgendadosQueryRef.valueChanges
      .pipe(
      map(( { data } ) => data[SEGUIMIENTO_OPERATIONS.filter.resolve] ))

  }

  querySinLlamada(hospital: VORoleHospitalPopulateLoginOut){
    let date=new Date();
    date.setHours(0,0,0);
    console.log(date);
    let filter:FiltrarSeguimientoIn = {  fechaUltimos: 
      { createAt: date, 
        isUltimos: true, 
        AndIdHospital: hospital.idHospital._id,
        AndEstado: SeguimientoEstadoEnum.SOLICITADO_SIN_LLAMADA
      }
    }
    this.segSinLlamadaQueryRef = this._suscriptionService.filterSeguimiento(filter);
    this.segSinLlamada$ = this.segSinLlamadaQueryRef.valueChanges
      .pipe(
      map(( { data } ) => data[SEGUIMIENTO_OPERATIONS.filter.resolve] ))

  }

  queryConLlamada(hospital: VORoleHospitalPopulateLoginOut){
    let date = new Date();
    date.setHours(0,0,0);
    let filter: FiltrarSeguimientoIn = {  fechaUltimos: 
      { createAt: date, 
        isUltimos: true, 
        AndIdHospital: hospital.idHospital._id,
        AndEstado: SeguimientoEstadoEnum.SOLICITADO_CON_LLAMADA 
      }
    }
    this.segConLlamadaQueryRef = this._suscriptionService.filterSeguimiento(filter);
    this.segConLlamada$ = this.segConLlamadaQueryRef.valueChanges
      .pipe(
      map(( { data } ) => data[SEGUIMIENTO_OPERATIONS.filter.resolve] ))

  }

  queryAtendidos(hospital: VORoleHospitalPopulateLoginOut, userLogged: LoginOut){
    let date=new Date();
    date.setHours(0,0,0);
    let filterAtendidos:FiltrarSeguimientoIn = {  fechaUltimos: 
      { createAt: date, 
        isUltimos: false, 
        AndIdHospital: hospital.idHospital._id,
        AndIdDoctor: userLogged._id,
        AndEstado: SeguimientoEstadoEnum.REVISADO_SIN_LLAMADA 
      }
    }
    this.segAtendidosQueryRef = this._suscriptionService.filterSeguimiento(filterAtendidos);
    this.segAtendidos$ = this.segAtendidosQueryRef.valueChanges
      .pipe(
      map(( { data } ) => data[SEGUIMIENTO_OPERATIONS.filter.resolve] ))

  }

  subscribeToSeguimientosSinLlamada() {
    this.segSinLlamadaQueryRef.subscribeToMore({
      document: SEGUIMIENTO_OPERATIONS.suscription.gql,
      updateQuery: (prev, {subscriptionData}) => {
        if (!subscriptionData.data || subscriptionData.data.cambioSeguimientoNotificacion.estado !== SeguimientoEstadoEnum.SOLICITADO_SIN_LLAMADA) {
          return prev;
        }
        console.log(prev);
        // console.log(subscriptionData);
        // console.log(subscriptionData.data.cambioSeguimientoNotificacion);
        const newDataQuery = this.getDataForUpdateGrapqlQuery(subscriptionData.data.cambioSeguimientoNotificacion, prev.filterSeguimiento)
        return {
          ...prev,
          filterSeguimiento: [...newDataQuery]
        };
      }
    });  
  }

  getDataForUpdateGrapqlQuery(entrySeguimiento: FiltrarSeguimientoOut, previousSeguimientos: FiltrarSeguimientoOut []): FiltrarSeguimientoOut[]{
    let index = previousSeguimientos.findIndex(item=>item.idPaciente._id === entrySeguimiento.idPaciente._id)
    if(index === -1)
      return [entrySeguimiento, ...previousSeguimientos]
    
    previousSeguimientos[index] = {...entrySeguimiento}
    return [...previousSeguimientos]
  }

  subscribeToSeguimientosConLlamada() {
    this.segConLlamadaQueryRef.subscribeToMore({
      document: SEGUIMIENTO_OPERATIONS.suscription.gql,
      updateQuery: (prev, {subscriptionData}) => {
        if (!subscriptionData.data || subscriptionData.data.cambioSeguimientoNotificacion.estado !== SeguimientoEstadoEnum.SOLICITADO_CON_LLAMADA) {
          return prev; 
        }
        const newDataQuery = this.getDataForSegConLlamadaQuery(subscriptionData.data.cambioSeguimientoNotificacion, prev.filterSeguimiento)
        return {
          ...prev,
          filterSeguimiento: [...newDataQuery]
        };
      }
    });
  }

  getDataForSegConLlamadaQuery(entrySeguimiento: FiltrarSeguimientoOut, previousSeguimientos: FiltrarSeguimientoOut []): FiltrarSeguimientoOut[]{
    let index = previousSeguimientos.findIndex(item=>item.idPaciente._id === entrySeguimiento.idPaciente._id)
    if(index === -1)
      return [entrySeguimiento, ...previousSeguimientos]
    
    previousSeguimientos[index] = {...entrySeguimiento}
    return [...previousSeguimientos]
  }

  subscribeToSeguimientosAgendadas() {
    this.segAgendadosQueryRef.subscribeToMore({
      document: SEGUIMIENTO_OPERATIONS.suscription.gql,
      updateQuery: (prev, {subscriptionData}) => {
        if (!subscriptionData.data ||  subscriptionData.data.cambioSeguimientoNotificacion.estado !== SeguimientoEstadoEnum.AGENDADO) {
          return prev;
        }
        const newDataQuery = [subscriptionData.data.cambioSeguimientoNotificacion, ...prev.filterSeguimiento]
        return {
          ...prev,
          filterSeguimiento: [...newDataQuery]
        };
      }
    });
  }

  subscribeToSeguimientosAtendidos() {
    this.segAtendidosQueryRef.subscribeToMore({
      document: SEGUIMIENTO_OPERATIONS.suscription.gql,
      updateQuery: (prev, {subscriptionData}) => {
        if (!subscriptionData.data || subscriptionData.data.cambioSeguimientoNotificacion.estado !== SeguimientoEstadoEnum.REVISADO_SIN_LLAMADA) {
          return prev;
        }
        const newDataQuery = [subscriptionData.data.cambioSeguimientoNotificacion, ...prev.filterSeguimiento]
        return {
          ...prev,
          filterSeguimiento: [...newDataQuery]
        };
      }
    });
  }

  showModalAtencion(seguimiento:FiltrarSeguimientoOut) {
    this._userFacade.openModalPerfil(seguimiento)
  }

   makeAction(args: ItemDragula){
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
    let notification: CrearNotificacionIn = {
        descripcion: '* ¡El médico se ha conectado para la video llamada ! * Por favor únase a la video llamada *',
        titulo: 'Importante',
        idReceptor: seguimiento.idPaciente._id,
        idSeguimiento: seguimiento._id
    }
    this._seguimientoFacade.dispatchActionSendNotificationVideoLlamada(seguimiento, this.userLogged, notification)
    this._router.navigate(['/video-llamada'], {state: {data: {...seguimiento}}});
  }

  getDate(date){
    // ISODate("2012-07-14T01:00:00+01:00").toLocaleTimeString() 
    // ISODate(date).toLocaleTimeString();
    // console.log(new date(date)); 
  }
}

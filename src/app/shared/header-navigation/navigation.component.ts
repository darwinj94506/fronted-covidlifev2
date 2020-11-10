import { Component, AfterViewInit, EventEmitter, Output, OnInit } from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbPanelChangeEvent,
  NgbCarouselConfig
} from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MainFacade } from '../../store/facade';
import { LoginOut,  
         ObtenerNotificacionesRecibidasOut } from '../../core/domain/outputs';
import { ObtenerNotificacionesEnviadasIn, ObtenerNotificacionesRecibidasIn } from '../../core/domain/inputs';
import { RolesUserEnum, TipoNotificacionEnum } from '../../core/domain/enums';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SuscriptionService } from '../../services';
import { SEGUIMIENTO_OPERATIONS } from '../../data/graphq';
import { QueryRef } from 'apollo-angular';
declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit, OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  userLogged$ : Observable<LoginOut>;
  notiRecibidas$ : Observable<ObtenerNotificacionesRecibidasOut[]>;
  notifRecibQueryRef: QueryRef<any>;
  showNotifications:boolean = false;
  NOTIFICATION_LLAMADA: TipoNotificacionEnum = TipoNotificacionEnum.DOCTOR_SE_HA_UNIDO_A_LA_LLAMADA;
  NOTIFICATION_AGENDADA : TipoNotificacionEnum = TipoNotificacionEnum.HA_SIDO_AGENDADA 
  suscription: Subscription;

  public config: PerfectScrollbarConfigInterface = {};
  public showSearch = false;
  

  constructor(private modalService: NgbModal,
     private _router: Router,
     private _suscriptionService: SuscriptionService,
     private _mainFacade: MainFacade) {
      let filter: ObtenerNotificacionesRecibidasIn = { andCreateAt: new Date()  };
      this.queryObtenerNotificacionesRecibidasOut(filter);
     }

  // This is for Notifications
  notifications: Object[] = [
    {
      btn: 'btn-danger',
      icon: 'ti-link',
      title: 'Luanch Admin',
      subject: 'Just see the my new admin!',
      time: '9:30 AM'
    },
    {
      btn: 'btn-success',
      icon: 'ti-calendar',
      title: 'Event today',
      subject: 'Just a reminder that you have event',
      time: '9:10 AM'
    },
    {
      btn: 'btn-info',
      icon: 'ti-settings',
      title: 'Settings',
      subject: 'You can customize this template as you want',
      time: '9:08 AM'
    },
    {
      btn: 'btn-primary',
      icon: 'ti-user',
      title: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  // This is for Mymessages
  mymessages: Object[] = [
    {
      useravatar: 'assets/images/users/1.jpg',
      status: 'online',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:30 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'busy',
      from: 'Sonu Nigam',
      subject: 'I have sung a song! See you at',
      time: '9:10 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'away',
      from: 'Arijit Sinh',
      subject: 'I am a singer!',
      time: '9:08 AM'
    },
    {
      useravatar: 'assets/images/users/4.jpg',
      status: 'offline',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  ngAfterViewInit() {}

  logout(){
    this._mainFacade.logout()
  }

  ngOnInit(){
    this.userLogged$ = this._mainFacade.getUserLogged();
    this._mainFacade.getHospitalSesion().subscribe(data=>{
      this.showNotifications = data.roles.includes(RolesUserEnum.PACIENTE);
      if(this.showNotifications)
        this.subscribeToNotifications();
    })
    
  }
  
  queryObtenerNotificacionesRecibidasOut(filter: ObtenerNotificacionesRecibidasIn){
    this.notifRecibQueryRef = this._suscriptionService.getNotificationesRecibidas(filter);
    this.notiRecibidas$ = this.notifRecibQueryRef.valueChanges
      .pipe(
        tap(console.log),
        map(( { data } ) => data[SEGUIMIENTO_OPERATIONS.getNoficacionesRecibidas.resolve] ))
  }


  subscribeToNotifications() {
      this.notifRecibQueryRef.subscribeToMore({
        document: SEGUIMIENTO_OPERATIONS.suscriptionNotificaciones.gql,
        updateQuery: (prev, {subscriptionData}) => {
          try {
            console.log([prev, subscriptionData]);
  
            if (!subscriptionData.data) {
              return prev;
            }
            const newDataQuery = this.getDataForUpdateGrapqlQuery(subscriptionData.data[SEGUIMIENTO_OPERATIONS.suscriptionNotificaciones.resolve],
                                    prev[SEGUIMIENTO_OPERATIONS.getNoficacionesRecibidas.resolve])
            return {
              ...prev,
              getNotificacionesRecibidas: [...newDataQuery]
            };
            
          } catch (error) {
            console.log("error"); 
          }
         
        }
      });   
  }

  getDataForUpdateGrapqlQuery(entryNotification: ObtenerNotificacionesRecibidasOut, 
                              previusNotifications: ObtenerNotificacionesRecibidasOut []): ObtenerNotificacionesRecibidasOut[]{
    console.log([entryNotification, previusNotifications])
    let index = previusNotifications.findIndex(item=>item._id === entryNotification._id)
    if(index === -1)
      return [entryNotification, ...previusNotifications]
    
    previusNotifications[index] = {...entryNotification}
    return [...previusNotifications]
  }

  cambiarHospital(){
    this._router.navigate(['/inicio']);
  }

  getDate(d): Date {
    let date = new Date(d);
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDay(), date.getUTCHours(), date.getUTCMinutes())
  }

  irVideoLlamada(notification: ObtenerNotificacionesRecibidasOut){
    // this._router.navigate(['/sala/llamada', notification.idSeguimiento, RolesUserEnum.PACIENTE]);
    // this._router.navigate(['/sala/llamada', seguimiento._id,  RolesUserEnum.DOCTOR, seguimiento.idPaciente._id ], {state: {data: {...seguimiento}}});

    // console.log(notification);
    if(notification.body && notification.body.tipo === TipoNotificacionEnum.DOCTOR_SE_HA_UNIDO_A_LA_LLAMADA
          || notification.body.tipo === TipoNotificacionEnum.HA_SIDO_AGENDADA )
          this._router.navigate(['/sala/llamada', notification.idSeguimiento, RolesUserEnum.PACIENTE,'123456']);
  }
  
  goToPerfil(){
    this._router.navigate(['/perfil']);
  }
  
}

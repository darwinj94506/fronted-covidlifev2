import { Component, OnInit, OnDestroy} from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { EstadoDiarioPacienteEnum } from '../../../../core/domain/enums'
import { 
         VerSeguimientosAgendadosUseCase,
         VerSeguimientosAtendidosUseCase, 
         VerSeguimientosNoAtendidosConLLamadaUseCase,
         VerSeguimientosNoAtendidosSinLLamadaUseCase} from '../../../../core/usecases/doctor'
import { Subject, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


interface args {
  name: string;
  el: Element;
  target: Element;
  source: Element;
  sibling: Element;
  item: any;
  sourceModel: any[];
  targetModel: any[];
}


@Component({
  selector: 'app-taskboard-view',
  templateUrl: './taskboard.component.html',
  styleUrls: ['./taskboard.component.scss']
})



export class TaskboardComponent implements OnInit, OnDestroy{
  private _destroyed$ = new Subject();
 

  segSinLlamada = []; 
  segConLlamada = [];
  segAgendados  = [];
  segAtendidos  = [];
  cargandoSegSinllamada = true;
  cargandoSegConLlamada = true;
  cargandoSegAgendados = true;
  cargandoSegAtendidos = true;
  constructor(private dragulaService: DragulaService,
     private _verSeguimientosAtendidos: VerSeguimientosAtendidosUseCase,
     private _verSeguimientosNoAtendidoConllamdaas : VerSeguimientosNoAtendidosConLLamadaUseCase,
     private _verSeguimientosNoAtendidoSinllamadas : VerSeguimientosNoAtendidosSinLLamadaUseCase,
     private _verSeguimientosAgendadosUseCase: VerSeguimientosAgendadosUseCase,
     private _toast: ToastrService,
     private _spinner: NgxSpinnerService ){
    
    this.dragulaService.destroy('SEGUIMIENTOS');
    this.dragulaService.createGroup("SEGUIMIENTOS", {});
    this.dragulaService.dropModel("SEGUIMIENTOS")
      .subscribe((args: args )=> {
        // this.makeAction(args);     
      });
  }

  ngOnInit(){
    this.cargarSeguimientosNoAtendidosSinLLamada();
    this.cargarSeguimientosNoAtendidosConLlamada();
    this.cargarSeguimientosAgendados();
    this.cargarSeguimientosAtendidos();
  }

  // makeAction(args: args){
  //   switch(args.target.getAttribute('id')){
  //     case 'segAgendados':
  //        console.log("segAgendados");
  //        this.markAsScheduled(args.item)
  //       break;
  //     case 'segAtendidos':
  //       console.log("segAtendidos");
  //       this.markAsAttended(args.item)
  //       break;
  //   }
  // }

  getCssClass(patientState: EstadoDiarioPacienteEnum): string {
    switch (patientState) {
      case EstadoDiarioPacienteEnum.EMPEORANDO:
        return "task-status-danger"
      case EstadoDiarioPacienteEnum.IGUAL_EVOLUCION:
        return "task-status-info"
      case EstadoDiarioPacienteEnum.MEJOR_EVOLUCION : 
        return "task-status-success"
      default:
        return ""
    }
  }

  mostrarMensajeDeError(msg){
    this._toast.error(msg,'Error')
  }

  cargarSeguimientosNoAtendidosSinLLamada(){

    this._spinner.show('spSegSinLlamada');
    this._verSeguimientosNoAtendidoSinllamadas.execute()
    .pipe(
      takeUntil(this._destroyed$))
    .subscribe( (data:any ) =>{
      setTimeout(()=>{
        this.cargandoSegSinllamada=false;
        this.segSinLlamada = [...data]
      },5000)
      console.log(data);
      
    },error=>{
      this.cargandoSegSinllamada=false;
      this.mostrarMensajeDeError('Error al cargar seguimientos');
    })
  }

  cargarSeguimientosNoAtendidosConLlamada(){
    this._spinner.show('spConLlamada');
    this._verSeguimientosNoAtendidoConllamdaas.execute()
    .pipe(
      takeUntil(this._destroyed$)  )
    .subscribe( (data: any) =>{
      setTimeout(()=>{
        this.segConLlamada = [...data]
        this.cargandoSegConLlamada=false;
      },5000)
      console.log(data);
      
    },error=>{
      this.cargandoSegConLlamada=false;
      this.mostrarMensajeDeError('Error al cargar seguimientos con solicitud de video llamada');
    })
  }

  cargarSeguimientosAtendidos(){
    this._spinner.show('spAtendidos');
    this._verSeguimientosAtendidos.execute()
    .pipe(
      takeUntil(this._destroyed$))
    .subscribe( (data:any) =>{
      setTimeout(()=>{
        this.cargandoSegAtendidos=false;
        this.segAtendidos = [...data]
      },5000)
      console.log(data);
     
    },error=>{
      this.cargandoSegAtendidos=false;
      this.mostrarMensajeDeError('Error al cargar seguimientos atendidos');
    })
  }

  cargarSeguimientosAgendados(){
    this._spinner.show('spAgendados');
    this._verSeguimientosAgendadosUseCase.execute()
    .pipe(takeUntil(this._destroyed$))
    .subscribe( (data:any) =>{
      setTimeout(()=>{
        this.cargandoSegAgendados=false;
        this.segAgendados = [...data]
      },5000)
      console.log(data);
    },error=>{
      this.cargandoSegAgendados=false;
      this.mostrarMensajeDeError('Error al cargar seguimientos agendados');
    })
  }

  // markAsAttended(appointment: IFollowUpResponse){
  //   this._markFollowUpAsAttededUseCase.execute(appointment)  
  // }

  // markAsScheduled(appointment: IFollowUpResponse){
  //   this._markFollowUpAsScheduledUseCase.execute(appointment)
  // }

  ngOnDestroy(){
    console.log("executed")
    this._destroyed$.next();
    this._destroyed$.complete();
  }

}

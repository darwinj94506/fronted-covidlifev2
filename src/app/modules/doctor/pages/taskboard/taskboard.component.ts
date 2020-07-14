import { Component, OnInit, OnDestroy} from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { FollowUpStateEnum, FollowUpTypeEnum, PatientStateFollowUpEnum } from '../../../../core/domain/enums'
import { MarkFollowUpAsAttendedUsecase,
         MarkFollowUpAsScheduledUsecase,
         SeeFollowUpsByStateUsecase, 
         SeeFollowUpsByTypeUsecase } from '../../../../core/usecases'
import { IFollowUpResponse } from '../../../../core/domain/responses';
import { Subject } from 'rxjs';
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
  regulares : IFollowUpResponse | [] = []; 
  videollamada: IFollowUpResponse | [] = [];
  agendadas : IFollowUpResponse | [] = [];
  atendidas : IFollowUpResponse | [] = [];

  constructor(private dragulaService: DragulaService,
     private _seeFollowUpsByState: SeeFollowUpsByStateUsecase,
     private _seeFollowUpsByType : SeeFollowUpsByTypeUsecase,
     private _markFollowUpAsAttededUseCase : MarkFollowUpAsAttendedUsecase,
     private _markFollowUpAsScheduledUseCase: MarkFollowUpAsScheduledUsecase,
     private _toastr: ToastrService,
     private _spinner: NgxSpinnerService ){
    
    this.dragulaService.destroy('SEGUIMIENTOS');
    this.dragulaService.createGroup("SEGUIMIENTOS", {});

    this.dragulaService.dropModel("SEGUIMIENTOS")
      .pipe(
        takeUntil(this._destroyed$))
      .subscribe((args: args )=> {
        this.makeAction(args);     
      });
  }

  ngOnInit(){
    this.loadFollowUps();
  }

  makeAction(args: args){
    switch(args.target.getAttribute('id')){
      case 'agendadas':
         console.log("agendadas");
         this.markAsScheduled(args.item)
        break;
      case 'atendidas':
        console.log("atendidas");
        this.markAsAttended(args.item)
        break;
    }
  }

  getCssClass(patientState: PatientStateFollowUpEnum): string {
    switch (patientState) {
      case PatientStateFollowUpEnum.EMPEORANDO:
        return "task-status-danger"
      case PatientStateFollowUpEnum.IGUAL_EVOLUCION:
        return "task-status-info"
      case PatientStateFollowUpEnum.MEJORANDO : 
        return "task-status-success"
      default:
        return ""
    }
  }

  loadFollowUps(){
    this._spinner.show();

    this._seeFollowUpsByType.execute(FollowUpTypeEnum.REGULAR, FollowUpStateEnum.NO_ATENDIDO)
      .pipe(
        takeUntil(this._destroyed$))
      .subscribe( (data: IFollowUpResponse) =>{
        console.log(data);
        this.regulares = data
        this._spinner.hide();
      })

    this._seeFollowUpsByType.execute(FollowUpTypeEnum.VIDEOLLAMADA, FollowUpStateEnum.NO_ATENDIDO)
      .pipe(
        takeUntil(this._destroyed$)  )
      .subscribe( (data: IFollowUpResponse) =>{
        console.log(data);
        this.videollamada = data
      })

    this._seeFollowUpsByState.execute(FollowUpStateEnum.ATENDIDO)
    .pipe(
      takeUntil(this._destroyed$))
    .subscribe( (data: IFollowUpResponse) =>{
      console.log(data);
      this.atendidas = data
    })

    this._seeFollowUpsByState.execute(FollowUpStateEnum.AGENDADO)
    .pipe(takeUntil(this._destroyed$))
    .subscribe( (data: IFollowUpResponse) =>{
      console.log(data);
      this.agendadas = data
    })
  }

  markAsAttended(appointment: IFollowUpResponse){
    this._markFollowUpAsAttededUseCase.execute(appointment)  
  }

  markAsScheduled(appointment: IFollowUpResponse){
    this._markFollowUpAsScheduledUseCase.execute(appointment)
  }

  ngOnDestroy(){
    console.log("executed")
    this._destroyed$.next();
    this._destroyed$.complete();
  }

}

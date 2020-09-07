import { Component, OnInit, Input } from '@angular/core';
import { SeguimientoCompletoPacienteOut } from '../../../../core/domain/outputs';
import { SeguimientoCompletoPacienteIn } from '../../../../core/domain/inputs';
import { Observable } from 'rxjs';
import { SeguimientoFacade } from '../../../../store/facade';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.css']
})
export class TimeLineComponent implements OnInit {
  @Input() idPaciente: String;
  seguimientos$ : Observable<SeguimientoCompletoPacienteOut[]>;
  isLoading$: Observable<boolean>;
  public config: PerfectScrollbarConfigInterface = {};

  constructor(private _seguimientoFacade: SeguimientoFacade) { }

  ngOnInit(): void {
    this.isLoading$ = this._seguimientoFacade.getIsLoadingSeguimientosCompletosFromStore();
    this.seguimientos$ = this._seguimientoFacade.getSeguimientosCompletosFromStore();
    this.loadSeguimientosCompletos(this.idPaciente);
  }

  loadSeguimientosCompletos(idPaciente:String){
    let params: SeguimientoCompletoPacienteIn = { idPaciente }
    this._seguimientoFacade.dispatchActionLoadSeguimientosCompletos(params);
  }

  transformDate(t){
    return new Date(new Date(t).getFullYear(), (new Date(t).getMonth()), new Date(t).getUTCDate())
  }

}

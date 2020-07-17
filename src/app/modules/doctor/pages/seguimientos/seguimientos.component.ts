import { Component, OnInit, OnDestroy} from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { Observable, Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MacarSeguimientoComoAgendado,
  MacarSeguimientoComoAtendido, 
  VerSeguimientosAgendadosUseCase,
  VerSeguimientosAtendidosUseCase, 
  VerSeguimientosNoAtendidosConLLamadaUseCase,
  VerSeguimientosNoAtendidosSinLLamadaUseCase} from '../../../../core/usecases/doctor';

@Component({
  selector: 'app-seguimientos',
  templateUrl: './seguimientos.component.html',
  styleUrls: ['./seguimientos.component.css']
})
export class SeguimientosComponent implements OnInit, OnDestroy {
  private _destroyed$ = new Subject();

  segSinLlamada = [];
  segConLlamada = [];
  segAtendidos = [];
  segAgendados = [];

  constructor(
     private _verSeguimientosAtendidos: VerSeguimientosAtendidosUseCase,
     private _verSeguimientosNoAtendidoConllamdaas : VerSeguimientosNoAtendidosConLLamadaUseCase,
     private _verSeguimientosNoAtendidoSinllamadas : VerSeguimientosNoAtendidosSinLLamadaUseCase,
     private _verSeguimientosAgendados: VerSeguimientosAgendadosUseCase,
     private dragulaService: DragulaService
     ) {

    this.dragulaService.createGroup("SEGUIMIENTOS", {});

    this.dragulaService.dropModel("SEGUIMIENTOS").subscribe(args => {

    });
  }

  ngOnInit(){
    this._verSeguimientosNoAtendidoSinllamadas.execute()
      .pipe(takeUntil(this._destroyed$))
      .subscribe((data: any)=> this.segSinLlamada = [...data]);

    this._verSeguimientosNoAtendidoConllamdaas.execute()
      .pipe(takeUntil(this._destroyed$))
      .subscribe((data:any)=> this.segConLlamada = [...data]);

    this._verSeguimientosAgendados.execute()
      .pipe(takeUntil(this._destroyed$))
      .subscribe((data:any)=>this.segAgendados = [...data]);

    this._verSeguimientosAtendidos.execute()
      .pipe(takeUntil(this._destroyed$)).subscribe((data:any)=>this.segAtendidos= [...data]);

  }
  ngOnDestroy(){
    this.dragulaService.destroy('SEGUIMIENTOS');
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}

import { Component, OnInit } from '@angular/core';
import { VerPacientesSinSeguimientosPorDiaUseCase } from '../../../../core/usecases/estadisticas';
import { UsuarioSinSeguimientoPorDiaIn } from '../../../../core/domain/inputs';
import { UsuarioSinSeguimientoPorDiaOut, VORoleHospitalPopulateLoginOut } from '../../../../core/domain/outputs';
import { MainFacade } from '../../../../store/facade';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-sin-seguimiento',
  templateUrl: './sin-seguimiento.component.html',
  styleUrls: ['./sin-seguimiento.component.css']
})
export class SinSeguimientoComponent implements OnInit {
  hospitalSesion: VORoleHospitalPopulateLoginOut;
  pacientes: UsuarioSinSeguimientoPorDiaOut [];

  constructor(private _verPacientesSinSeguimientosPorDiaUseCase: 
              VerPacientesSinSeguimientosPorDiaUseCase, 
              private _spinner: NgxSpinnerService,
              private _mainFacade: MainFacade) { }

  ngOnInit(): void {
    this._mainFacade.getHospitalSesion()
      .subscribe(data=>{
        console.log(data);
        this.hospitalSesion = data
      })
  }

  buscar(fecha){
    console.log(fecha);
    let filter: UsuarioSinSeguimientoPorDiaIn = {
      fecha:fecha,
      idHospital: this.hospitalSesion.idHospital._id
    }
    this._spinner.show();
    this._verPacientesSinSeguimientosPorDiaUseCase.execute(filter)
      .subscribe(data=>{
        this._spinner.hide();
        console.log(data);
        this.pacientes = data;
      },err=>{
        this._spinner.hide();
      })
  }

}

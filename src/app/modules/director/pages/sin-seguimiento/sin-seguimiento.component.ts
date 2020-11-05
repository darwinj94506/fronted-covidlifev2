import { Component, OnInit } from '@angular/core';
import { VerPacientesSinSeguimientosPorDiaUseCase } from '../../../../core/usecases/estadisticas';
import { UsuarioSinSeguimientoPorDiaIn } from '../../../../core/domain/inputs';
import { UsuarioSinSeguimientoPorDiaOut, VORoleHospitalPopulateLoginOut } from '../../../../core/domain/outputs';
import { MainFacade } from '../../../../store/facade';
import { NgxSpinnerService } from 'ngx-spinner';
import { RolesUserEnum } from '../../../../core/domain/enums';
interface RolHospital{
  idHospital:String;
  roles: RolesUserEnum [];
}

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
        // console.log(data);
        this.hospitalSesion = data
      })
  }

  buscar(fecha){
    let b = fecha.split(/\D/);
     let date = new Date(b[0], --b[1], b[2]);
    //  console.log(date);   
    let filter: UsuarioSinSeguimientoPorDiaIn = {
      fecha:date,
      idHospital: this.hospitalSesion.idHospital._id
    }
    this._spinner.show();
    this._verPacientesSinSeguimientosPorDiaUseCase.execute(filter)
      .subscribe(data=>{
        this._spinner.hide();
        // console.log(data);
        this.pacientes = data;
      },err=>{
        this._spinner.hide();
        alert("Error al cargar los datos. Error:" +err.message);
      })
  }

  show(roles: RolHospital[]): boolean{
    // console.log(roles);
    let hospital =  roles.find(i=>i.idHospital === this.hospitalSesion.idHospital._id);
    // console.log(hospital);
    // this.hospitalSesion.idHospital
    if(hospital.roles.includes(RolesUserEnum.PACIENTE)){
      // console.log(true);
      return true;
    }
    return false;
  }

}

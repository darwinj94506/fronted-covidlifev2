import { Component, OnInit } from '@angular/core';
import { SeguimientoFacade, MainFacade } from '../../../../store/facade';
import { FiltrarSeguimientoOut } from '../../../../core/domain/outputs';
import { FiltrarSeguimientoIn } from '../../../../core/domain/inputs';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {

  citas$: Observable<FiltrarSeguimientoOut[]>;
  constructor(  private _seguimientoFadade: SeguimientoFacade,
                private _mainFacade: MainFacade) { }

  ngOnInit(): void {
    this._mainFacade.getUserLogged().subscribe(userLogged=>{
      let filter: FiltrarSeguimientoIn = {
        fechaUltimos:{
          isUltimos:false,
          createAt:new Date(),
          AndIdPaciente:userLogged._id
        }
      }
      this._seguimientoFadade.dispatchActionLoadCitas(filter);
      this.citas$ = this._seguimientoFadade.getCitasPacienteFromStore()
    })

    
  }

}

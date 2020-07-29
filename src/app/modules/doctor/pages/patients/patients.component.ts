import { Component, OnInit } from '@angular/core';
import { IUsuarioEntity } from '../../../../core/domain/entities';
import { FilterUserIn } from '../../../../core/domain/inputs';
import { RolesUserEnum } from '../../../../core/domain/enums';
import { MainFacade } from '../../../../store/facade/main.facade';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  users$: Observable<IUsuarioEntity []>;
  tableForRolAdmin:RolesUserEnum.PACIENTE;

  constructor( private _mainFacade: MainFacade) { }

  ngOnInit(): void {
    this.loadUsers();
    this.users$ = this._mainFacade.getUsers()
  }

  loadUsers(){    
    forkJoin(this._mainFacade.getUserLogged(), this._mainFacade.getHospitalSesion())
      .subscribe(([userLogged,hospitaSession])=>{
        let filter : FilterUserIn = { role: RolesUserEnum.PACIENTE };
        if(!userLogged.isRoot)
          filter =  { idHospital: hospitaSession.idHospital._id, role: RolesUserEnum.PACIENTE}
        this._mainFacade.loadUsers(filter)
    })
  }
}

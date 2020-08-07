import { Component, OnInit, Input } from '@angular/core';
import { IUsuarioEntity } from '../../core/domain/entities';
import { RolesUserEnum } from '../../core/domain/enums';
import { Observable } from 'rxjs';
import { UserFacade } from '../../store/facade';

import { AsignarRoleIn } from '../../core/domain/inputs'
@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  @Input() tableFor: RolesUserEnum; 

  @Input() users$ : Observable<IUsuarioEntity[]>;  
    
  searchItem : string = ""; 

  constructor(private _userFacade:UserFacade )   {
  }

  ngOnInit(): void {
   
  }

  getTitulo(){
    if(this.tableFor == RolesUserEnum.PACIENTE)
      return 'Pacientes';
    return 'Personal'
  }

  getDescripcion(){
    if(this.tableFor == RolesUserEnum.PACIENTE)
      return 'Pacientes actuamente registrados';
    return 'Personal registrado, médicos, directore y administradores.'
  }

  openModalCreateUpdate(user){
    this._userFacade.dispatchActionOpenModalCreateUpdateUser(user);
  }

  openModalConfirm(user){

  }

  openModalAsignarRoles(){
    let roles :AsignarRoleIn = {idUser:'', idHospital:'', role:RolesUserEnum.DOCTOR}
    this._userFacade.dispatchActionOpenModalAsignarRole(roles)
  }
  
}

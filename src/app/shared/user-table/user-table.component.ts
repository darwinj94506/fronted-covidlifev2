import { Component, OnInit, Input } from '@angular/core';
import { RolesUserEnum } from '../../core/domain/enums';
import { Observable } from 'rxjs';
import { UserFacade, MainFacade } from '../../store/facade';
import { FilterUserOut, VORoleHospitalPopulateOut } from '../../core/domain/outputs';
@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  @Input() tableFor: RolesUserEnum; 

  @Input() users$ : Observable<FilterUserOut[]>;  
    
  searchItem : string = ""; 

  constructor(private _userFacade:UserFacade, private _mainFacade:MainFacade)   {
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

  openModalAsignarRoles(user: FilterUserOut){
    this._mainFacade.getHospitalSesion()
      .subscribe(hospitalSession=>{
        let rolesHospital: VORoleHospitalPopulateOut = user.roles.find(obj=> obj.idHospital._id === hospitalSession.idHospital._id)
        this._userFacade.dispatchActionOpenModalAsignarRole(rolesHospital,user._id)
    })
  }

  openModalSearchAddUsers(){
    this._userFacade.distpachActionOpenModalSearchUser();
  }
  
}

import { Component, OnInit } from '@angular/core';
import { RolesUserEnum } from '../../../../core/domain/enums';
import { MainFacade } from '../../../../store/facade/main.facade';
import { Observable } from 'rxjs';
import { FilterUserIn } from '../../../../core/domain/inputs';
import { FilterUserOut } from '../../../../core/domain/outputs';
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  tableForRolAdmin : RolesUserEnum.ADMIN;
  users$: Observable<FilterUserOut[]>;
  constructor(private _mainFacade: MainFacade) {
  }

  ngOnInit() {
    this._mainFacade.getHospitalSesion()
      .subscribe(hospital=>{
        let filter: FilterUserIn = {
          idHospital: hospital.idHospital._id
        }
        this._mainFacade.loadUsers(filter);
      })
   
    this.users$ = this._mainFacade.getUsers()

  }

}

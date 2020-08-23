import { Component, OnInit } from '@angular/core';
import { RolesUserEnum } from '../../../../core/domain/enums';
import { FilterUserOut } from '../../../../core/domain/outputs';
import { MainFacade } from '../../../../store/facade/main.facade';
import { Observable } from 'rxjs';
import { FilterUserIn } from 'src/app/core/domain/inputs';


@Component({
  selector: 'app-administrators',
  templateUrl: './administrators.component.html',
  styleUrls: ['./administrators.component.css']
})

export class AdministratorsComponent implements OnInit{
    
    tableForRolAdmin : RolesUserEnum.ADMIN;
    users$: Observable<FilterUserOut[]>;
    constructor(private _mainFacade: MainFacade) {
    }

    ngOnInit() {
      // this._mainFacade.loadUsers({});
      // this.users$ = this._mainFacade.getUsers()

      this._mainFacade.getHospitalSesion()
      .subscribe(hospital=>{
        let filter: FilterUserIn = {
          idHospital: hospital.idHospital._id,
          role: RolesUserEnum.ADMIN
        }
        this._mainFacade.loadUsers(filter);
      })
   
    this.users$ = this._mainFacade.getUsers()


    }
}

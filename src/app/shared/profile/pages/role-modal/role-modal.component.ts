import { Component, OnInit } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Formulario } from '../../../../core/domain/class/formulario';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MainFacade } from '../../../../store/facade/main.facade';
import { RolesUserEnum } from '../../../../core/domain/enums';
@Component({
  selector: 'app-role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.css']
})

export class RoleModalComponent extends Formulario implements OnInit {
  roleForm: FormGroup;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
 
  constructor(public modal: NgbActiveModal, private fb: FormBuilder, private _mainFacade:MainFacade) { 
    super({})
  }

  ngOnInit(): void {
    this.dropdownSettings = { 
      singleSelection: false, 
      text:"Seleccione Roles",
      selectAllText:'Seleccionar todo',
      unSelectAllText:'Limpiar',
      enableSearchFilter: true,
      classes:"myclass custom-class"
    };

    this.dropdownList = [RolesUserEnum.DOCTOR, RolesUserEnum.DIRECTOR, RolesUserEnum.PACIENTE, RolesUserEnum.ADMIN]  
  }

  initForm(){
    this._mainFacade.getHospitalSesion().subscribe(hospital=> {
      this.roleForm = this.fb.group({
        roles: [ hospital.roles ],
      });
    })
  }

  onSubmit(){
    

  }

}

import { Component, OnInit,Input } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Formulario } from '../../../../core/domain/class/formulario';
import { UserFacade } from '../../../../store/facade';
import { RolesUserEnum } from '../../../../core/domain/enums';
import { AsignarRoleIn } from '../../../../core/domain/inputs';
import { VORoleHospitalPopulateLoginOut } from '../../../../core/domain/outputs';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.css']
})

export class RoleModalComponent implements OnInit {

  @Input() idUsuario: String;
  @Input() hospitalRoles: VORoleHospitalPopulateLoginOut;

  constructor(public modal: NgbActiveModal, private fb: FormBuilder, private _userFacade:UserFacade) { 
    
  }

  form: FormGroup;

  rolesData = [
    RolesUserEnum.DOCTOR,
    RolesUserEnum.DIRECTOR,
    RolesUserEnum.PACIENTE,
    RolesUserEnum.ADMIN 
  ];

  get rolesFormArray() {
    return this.form.controls.roles as FormArray;
  }

  ngOnInit(): void {    
    this.form = this.fb.group({
      roles: new FormArray([])
    });

    this.addCheckboxes();
   
  }

  

  private addCheckboxes() {
        
    this.rolesData.forEach((rol) => {
        this.rolesFormArray.push(this.hospitalRoles.roles.includes(rol)  ? new FormControl(true):new FormControl(false))
    });
  }

  
  onSubmit(role: RolesUserEnum){
    console.log(role);
    let asignarRoleIn: AsignarRoleIn = {
      idUser: this.idUsuario,
      idHospital: this.hospitalRoles.idHospital._id,
      role: role
    }
    this._userFacade.dispatchActionAsignarRole(asignarRoleIn)
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './user-form/user-form.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [UserFormComponent, PatientFormComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  exports:[
    UserFormComponent,
    FormsModule,
    ReactiveFormsModule,
    PatientFormComponent 
  ]
})

export class UserFormModule { }

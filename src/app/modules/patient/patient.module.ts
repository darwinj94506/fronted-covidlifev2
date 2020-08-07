import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientRoutingModule } from './patient-routing.module';
import{ MedicalAppointmentsComponent, VideoCallComponent } from './pages';
import { NgSelectModule } from '@ng-select/ng-select';
import { CitasComponent } from './pages/citas/citas.component';


@NgModule({
  declarations: [MedicalAppointmentsComponent, VideoCallComponent, CitasComponent],
  imports: [
    CommonModule,
    PatientRoutingModule,
    NgSelectModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class PatientModule { }

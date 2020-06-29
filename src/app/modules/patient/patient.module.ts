import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import{ MedicalAppointmentsComponent, VideoCallComponent } from './pages';


@NgModule({
  declarations: [MedicalAppointmentsComponent, VideoCallComponent],
  imports: [
    CommonModule,
    PatientRoutingModule
  ]
})
export class PatientModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientRoutingModule } from './patient-routing.module';
import{ MedicalAppointmentsComponent, VideoCallComponent } from './pages';
import { NgSelectModule } from '@ng-select/ng-select';
import { CitasComponent } from './pages/citas/citas.component';
import { VideoChatModule } from '../video-chat/video-chat.module';


@NgModule({
  declarations: [MedicalAppointmentsComponent, VideoCallComponent, CitasComponent],
  imports: [
    CommonModule,
    PatientRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    VideoChatModule
  ]
})
export class PatientModule { }

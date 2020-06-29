import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{ MedicalAppointmentsComponent, VideoCallComponent } from './pages';

const routes: Routes = [
  {
    path:'', children:[
      {
        path:'citas', component:MedicalAppointmentsComponent
      },
      {
        path:'video-llamada', component:VideoCallComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }

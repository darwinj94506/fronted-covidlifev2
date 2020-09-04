import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{ MedicalAppointmentsComponent, CitasComponent } from './pages';

const routes: Routes = [
  {
    path:'', children:[
      {
        path:'enviar-sintomas', component: MedicalAppointmentsComponent,
        data: {
          title: 'Enviar seguimiento'          
        }
      },
      {
        path:'citas', component: CitasComponent,
        data: {
          title: 'Seguimientos Enviados'          
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }

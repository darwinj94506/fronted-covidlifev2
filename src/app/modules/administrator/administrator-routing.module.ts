import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffComponent, HospitalComponent } from './pages';

const routes: Routes = [
  {
    path:'', children: [
      { 
        path: 'personal', component: StaffComponent,
        data: {
          title: 'Usuarios'          
        }
      },
      { 
        path: 'hospital', component: HospitalComponent,
        data: {
          title: 'Información del hospital'          
        } 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffComponent, HospitalComponent } from './pages';

const routes: Routes = [
  {
    path:'', children: [
      { 
        path: 'personal', component: StaffComponent
        
      },
      { 
        path: 'hospital', component: HospitalComponent 
      
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }

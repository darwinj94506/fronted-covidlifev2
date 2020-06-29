import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientsComponent, TaskboardComponent,FullcalendarComponent } from './pages';

const routes: Routes = [
  {
    path:'',
    children:[
      { path:'pacientes', component: PatientsComponent,
        data: {
          title: 'Pacientes',
          urls: [
              { title: 'Dashboard', url: '/dashboard' },
              { title: 'Taskboard' }
          ]
        }
      },
      { path:'citas', component: TaskboardComponent,
          data: {
            title: 'Citas médicas',
            urls: [
                { title: 'Dashboard', url: '/dashboard' },
                { title: 'Taskboard' }
            ]
          }
      },
      { path:'agenda', component : FullcalendarComponent,
          data: {
            title: 'Agenda',
            urls: [
                { title: 'Dashboard', url: '/dashboard' },
                { title: 'Taskboard' }
            ]
          }
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }

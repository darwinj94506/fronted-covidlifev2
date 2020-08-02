import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientsComponent,
   VideoCallComponent,
   SeguimientosComponent,
   DailyStatusComponent} from './pages';

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
   
      { path:'estado-diario', component : DailyStatusComponent,
      data: {
        title: 'Estado diario de pacientes',
        urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Taskboard' }
        ]
      }
    },
      { path:'video-llamada', component : VideoCallComponent,
        data: {
          title: 'Video llamada',
          urls: [
              { title: 'Dashboard', url: '/dashboard' },
              { title: 'Taskboard' }
          ]
        }
      },

      { path:'seguimientos', component : SeguimientosComponent,
      data: {
        title: 'Seguimientos',
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

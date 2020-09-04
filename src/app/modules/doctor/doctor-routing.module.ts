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
        }
      },
   
      { path:'estado-diario', component : DailyStatusComponent,
        data: {
          title: 'Seguimientos'
        }
    },
      { path:'video-llamada', component : VideoCallComponent,
          data: {
            title: 'Video llamada'
          }
      },

      { path:'seguimientos', component : SeguimientosComponent,
        data: {
          title: 'Seguimientos'
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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapsComponent, StatisticsComponent, SinSeguimientoComponent } from './pages';

const routes: Routes = [
  { path:'', 
    children:[
      { 
        path:'mapas', component:MapsComponent, data: {
          title: 'Mapas'
          // urls: [
          //     { title: 'Dashboard', url: '/dashboard' },
          //     { title: 'Mapas' }
          // ]
        }
      },
      { 
        path:'estadisticas', component: StatisticsComponent, data: {
          title: 'Estadísticas'          
        }
      },
      { 
        path:'pacientes-sin-seguimiento', component: SinSeguimientoComponent, data: {
          title: 'Reporte de Pacientes Sin Seguimientos'          
        }
      }

  ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectorRoutingModule { }

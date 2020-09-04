import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapsComponent, StatisticsComponent } from './pages';

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
        path:'estadisticas', component:StatisticsComponent, data: {
          title: 'Estadísticas'          
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

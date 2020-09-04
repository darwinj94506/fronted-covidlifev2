import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HospitalsComponent, AdministratorsComponent, PlacesComponent} from './pages';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'hospitales',
        component: HospitalsComponent,
        data: {
          title: 'Hospitales'          
        }
      },
      {
        path: 'administradores',
        component: AdministratorsComponent,
        data: {
          title: 'Administradores'          
        }
      },
      {
        path: 'lugares',
        component:PlacesComponent,
        data: {
          title: 'Lugares'          
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RootUserRoutingModule { }

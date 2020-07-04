import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HospitalsComponent, AdministratorsComponent, PlacesComponent} from './pages';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'hospitales',
        component: HospitalsComponent
      },
      {
        path: 'administradores',
        component: AdministratorsComponent
      },
      {
        path: 'lugares',
        component:PlacesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RootUserRoutingModule { }

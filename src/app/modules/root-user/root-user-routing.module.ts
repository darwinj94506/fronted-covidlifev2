import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HospitalsComponent, AdministratorsComponent} from './pages';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RootUserRoutingModule { }

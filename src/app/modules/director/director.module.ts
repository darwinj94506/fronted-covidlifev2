import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectorRoutingModule } from './director-routing.module';
import { MapsComponent, StatisticsComponent } from './pages';
// import { DashboardModule } from '../../dashboards/dashboard.module';
// import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ItemsModule } from './components/items.module'
import { AgmCoreModule } from '@agm/core';
@NgModule({
  declarations: [
    StatisticsComponent, 
    MapsComponent],
  imports: [
    CommonModule,
    DirectorRoutingModule,
    AgmCoreModule,
    ItemsModule
  ]
})
export class DirectorModule { }

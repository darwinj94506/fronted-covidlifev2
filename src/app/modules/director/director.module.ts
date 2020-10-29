import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectorRoutingModule } from './director-routing.module';
import { MapsComponent, StatisticsComponent } from './pages';
// import { DashboardModule } from '../../dashboards/dashboard.module';
// import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// import { NgSelectModule } from '@ng-select/ng-select';

import { ItemsModule } from './components/items.module'
import { AgmCoreModule } from '@agm/core';
import { EstadisticasEffects } from "./store/estadisticas.effects";
import { reducer } from './store/estadisticas.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SinSeguimientoComponent } from './pages/sin-seguimiento/sin-seguimiento.component';
// import { LineaEvolucionComponent } from './components/linea-evolucion/linea-evolucion.component';

@NgModule({
  declarations: [
    StatisticsComponent, 
    MapsComponent, SinSeguimientoComponent],
  imports: [
    CommonModule,
    DirectorRoutingModule,
    AgmCoreModule,
    ItemsModule,
    // NgSelectModule,
    StoreModule.forFeature('estadisticas', reducer),
    EffectsModule.forFeature([ EstadisticasEffects ])
  ]
})
export class DirectorModule { }

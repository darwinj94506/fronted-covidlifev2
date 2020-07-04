import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RootUserRoutingModule } from './root-user-routing.module';
import { AdministratorsComponent, HospitalsComponent, PlacesComponent} from './pages';
import { UserService, ProvinceService } from './services';

import { StoreModule } from '@ngrx/store';
// import * as fromExchangeRate from './store/exchange-rate/exchange-rate.reducer';
import * as fromProvince from './store/reducers/province.reducers'; 
import { EffectsModule } from '@ngrx/effects';
import { ProvinceEffects } from './store/effects/province.effecs';


@NgModule({
  declarations: [AdministratorsComponent, HospitalsComponent, PlacesComponent],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    RootUserRoutingModule,
    NgbModalModule,
    NgbModule,
    StoreModule.forFeature('province', fromProvince.reducer),
    EffectsModule.forFeature([ProvinceEffects])
  ],
  providers:[
    DecimalPipe,
    DatePipe,
    UserService,
    ProvinceService
  ]
})
export class RootUserModule { }

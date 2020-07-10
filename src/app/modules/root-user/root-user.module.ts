import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RootUserRoutingModule } from './root-user-routing.module';
import { AdministratorsComponent, HospitalsComponent, PlacesComponent,
  ProvinceFormComponent } from './pages';
import { UserService, ProvinceService } from './services';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RootUserReducers } from './store/root-user.reducer';
import { ProvinceEffects } from './store/effects/province.effecs';
import { ProvinceTableComponent } from './pages/places/province/province-table/province-table.component';

import { UiModule } from '../../ui/ui.module';
import { CantonFormComponent } from './pages/places/canton/canton-form/canton-form.component';
import { CantonTableComponent } from './pages/places/canton/canton-table/canton-table.component';

@NgModule({
  declarations: [AdministratorsComponent,
     HospitalsComponent, 
     PlacesComponent,
     ProvinceFormComponent,
     ProvinceTableComponent,
     CantonFormComponent,
     CantonTableComponent],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    RootUserRoutingModule,
    NgbModalModule,
    NgbModule,
    UiModule,
    StoreModule.forFeature('rootUserState', RootUserReducers),
    EffectsModule.forFeature([ProvinceEffects])
  ],
  providers:[
    DecimalPipe,
    DatePipe,
    UserService,
    ProvinceService
  ],
  entryComponents:[
    ProvinceFormComponent
  ]
})
export class RootUserModule { }

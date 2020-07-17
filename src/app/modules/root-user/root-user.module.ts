import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RootUserRoutingModule } from './root-user-routing.module';
import { AdministratorsComponent,
         HospitalsComponent, 
         PlacesComponent,
         FormComponent } from './pages';
import { UserService, ProvinceService } from './services';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RootUserReducers } from './store/root-user.reducer';
import { ProvinceEffects, EspacioEffects } from './store/effects';

import { UiModule } from '../../ui/ui.module';
import { TableComponent } from './pages/places/table/table.component';

@NgModule({
  declarations: [AdministratorsComponent,
     HospitalsComponent, 
     PlacesComponent,
     FormComponent,
     TableComponent],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    RootUserRoutingModule,
    NgbModalModule,
    NgbModule,
    UiModule,
    StoreModule.forFeature('rootUserState', RootUserReducers),
    EffectsModule.forFeature([ProvinceEffects, EspacioEffects])
  ],
  providers:[
    DecimalPipe,
    DatePipe,
    UserService,
    ProvinceService
  ],
  entryComponents:[
    FormComponent
  ]
})
export class RootUserModule { }

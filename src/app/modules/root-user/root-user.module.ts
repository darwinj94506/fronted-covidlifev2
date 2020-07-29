import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RootUserRoutingModule } from './root-user-routing.module';
import { AdministratorsComponent,
         HospitalsComponent, 
         PlacesComponent,
         TablaHospitalesComponent,
         FormHospitalComponent,
         FormComponent } from './pages';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserService } from './services';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RootUserReducers } from './store/root-user.reducer';
import { EspacioEffects,
         HospitalEffects} from './store/effects';

import { UiModule } from '../../ui/ui.module';
import { TableComponent } from './pages/places/table/table.component';


import { UserFormModule } from '../../shared/user-form/user-form.module';
import { UserTableModule } from '../../shared/user-table/user-table.module';
@NgModule({
  declarations: [AdministratorsComponent,
     HospitalsComponent, 
     PlacesComponent,
     FormComponent,
     TableComponent,
     TablaHospitalesComponent,
     FormHospitalComponent
    ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    RootUserRoutingModule,
    NgbModalModule,
    NgbModule,
    UiModule,
    UserFormModule,
    UserTableModule,
    NgSelectModule,
    StoreModule.forFeature('rootUserState', RootUserReducers),
    EffectsModule.forFeature([ EspacioEffects, HospitalEffects])
  ],
  providers:[
    DecimalPipe,
    DatePipe,
    UserService
  ],
  entryComponents:[
    FormComponent,
    FormHospitalComponent
  ]
})
export class RootUserModule { }

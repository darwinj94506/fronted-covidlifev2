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
import { UserService } from './services';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RootUserReducers } from './store/root-user.reducer';
import { EspacioEffects } from './store/effects';

import { UiModule } from '../../ui/ui.module';
import { TableComponent } from './pages/places/table/table.component';
import { TablaHospitalesComponent } from './pages/hospitals/tabla-hospitales/tabla-hospitales.component';
import { FormHospitalComponent } from './pages/hospitals/form-hospital/form-hospital.component';

@NgModule({
  declarations: [AdministratorsComponent,
     HospitalsComponent, 
     PlacesComponent,
     FormComponent,
     TableComponent,
     TablaHospitalesComponent,
     FormHospitalComponent],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    RootUserRoutingModule,
    NgbModalModule,
    NgbModule,
    UiModule,
    StoreModule.forFeature('rootUserState', RootUserReducers),
    EffectsModule.forFeature([ EspacioEffects])
  ],
  providers:[
    DecimalPipe,
    DatePipe,
    UserService,
    
  ],
  entryComponents:[
    FormComponent
  ]
})
export class RootUserModule { }

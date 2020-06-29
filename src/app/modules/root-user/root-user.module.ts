import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Routes, RouterModule } from '@angular/router';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RootUserRoutingModule } from './root-user-routing.module';
import { AdministratorsComponent, HospitalsComponent} from './pages';
import { UserService } from './services'

@NgModule({
  declarations: [AdministratorsComponent, HospitalsComponent],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    RootUserRoutingModule,
    NgbModalModule,
    NgbModule
  ],
  providers:[
    DecimalPipe,
    DatePipe,
    UserService
  ]
})
export class RootUserModule { }

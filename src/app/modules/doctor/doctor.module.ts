import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { DragulaModule } from 'ng2-dragula';
import { FlatpickrModule } from 'angularx-flatpickr';

import { QuillModule } from 'ngx-quill';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { DoctorRoutingModule } from './doctor-routing.module';
import { PatientsComponent } from './pages';
import { DailyStatusComponent } from './pages/daily-status/daily-status.component';
import { VideoCallComponent } from './pages/video-call/video-call.component';

import { CallDashModule } from '../video-chat/call-dash/call-dash.module';
import { CardComponent } from './components/card/card.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { SeguimientosComponent } from './pages/seguimientos/seguimientos.component';
import { UserTableModule } from '../../shared/user-table/user-table.module';
import { ProfileModule } from '../../shared/profile/profile.module';
import { UiModule } from '../../ui/ui.module';
@NgModule({
  declarations: [PatientsComponent, DailyStatusComponent, VideoCallComponent, CardComponent, SeguimientosComponent],
  imports: [
    CommonModule,
    NgbModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    DoctorRoutingModule,
    Ng2SearchPipeModule, 
    QuillModule.forRoot(),
    DragulaModule.forRoot(),
    CallDashModule,
    NgxSpinnerModule,
    UserTableModule,
    ProfileModule,
    UiModule
  ],
  providers:[
    DatePipe, 
    DecimalPipe
  ]
})
export class DoctorModule { }

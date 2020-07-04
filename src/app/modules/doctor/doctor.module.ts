import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { DragulaModule } from 'ng2-dragula';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { QuillModule } from 'ngx-quill';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { DoctorRoutingModule } from './doctor-routing.module';
import { PatientsComponent, TaskboardComponent } from './pages';
import { DailyStatusComponent } from './pages/daily-status/daily-status.component';
import { VideoCallComponent } from './pages/video-call/video-call.component';

import { AppsModule } from '../../apps/apps.module';
import { CallDashModule } from '../video-chat/call-dash/call-dash.module';
@NgModule({
  declarations: [PatientsComponent, TaskboardComponent, DailyStatusComponent, VideoCallComponent],
  imports: [
    CommonModule,
    NgbModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    DoctorRoutingModule,
    Ng2SearchPipeModule, 
    QuillModule.forRoot(),
    AppsModule,   
    DragulaModule.forRoot(),
    CallDashModule
  ],
  providers:[
    DatePipe, 
    DecimalPipe
  ]
})
export class DoctorModule { }

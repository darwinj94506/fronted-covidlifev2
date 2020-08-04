import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallDashComponent } from './call-dash.component';
// import { SignalingService, SimplePeerService } from '../shared-services';
import { ProfileModule } from '../../../shared/profile/profile.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [CallDashComponent],
  imports: [
    CommonModule,
    ProfileModule,
    NgbModule
  ],
  exports:[
    CallDashComponent
  ]
  // providers:[
  //   SignalingService, 
  //   SimplePeerService
  // ]
})
export class CallDashModule { }

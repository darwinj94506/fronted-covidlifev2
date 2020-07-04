import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallDashComponent } from './call-dash.component';
// import { SignalingService, SimplePeerService } from '../shared-services';
@NgModule({
  declarations: [CallDashComponent],
  imports: [
    CommonModule,
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

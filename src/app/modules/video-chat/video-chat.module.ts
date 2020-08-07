import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileModule } from '../../shared/profile/profile.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VideoChatRoutingModule } from './video-chat-routing.module';
import { MainComponent } from './pages/main/main.component';
import { VideoChatRoomComponent } from './pages/video-chat-room/video-chat-room.component';


@NgModule({
  declarations: [MainComponent, VideoChatRoomComponent],
  imports: [
    CommonModule,
    VideoChatRoutingModule,
    NgbModule,
    ProfileModule
  ]
})
export class VideoChatModule { }

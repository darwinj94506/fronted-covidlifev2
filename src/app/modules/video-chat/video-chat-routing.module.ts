import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoChatRoomComponent } from './pages/video-chat-room/video-chat-room.component';
import { MainComponent } from './pages/main/main.component'; 

const routes: Routes = [
  {
    path:'',component: VideoChatRoomComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoChatRoutingModule{} 
 

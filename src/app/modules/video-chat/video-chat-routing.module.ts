import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoChatRoomComponent } from './pages/video-chat-room/video-chat-room.component';
import { MainComponent } from './pages/main/main.component'; 
import { VideoResolveService } from './services/video-resolve.service';

const routes: Routes = [
  {
    resolve:{
      seguimientoPorAtender: VideoResolveService
    },
    path:'llamada/:id/:rol',component: VideoChatRoomComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoChatRoutingModule{} 
 

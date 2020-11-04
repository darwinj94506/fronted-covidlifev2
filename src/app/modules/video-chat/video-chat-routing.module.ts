import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoChatRoomComponent } from './pages/video-chat-room/video-chat-room.component';
// import { MainComponent } from './pages/main/main.component'; 
import { VideoResolveService } from './services/video-resolve.service';
import { HistorialResolveService } from './services/historial-resolve.service';
const routes: Routes = [
  {
    path:'llamada/:id/:rol/:user',component: VideoChatRoomComponent,
    resolve:{
      seguimientoPorAtender: VideoResolveService,
      historial: HistorialResolveService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoChatRoutingModule{} 
 

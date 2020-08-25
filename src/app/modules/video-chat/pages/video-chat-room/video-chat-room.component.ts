import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { UserFacade, SeguimientoFacade } from '../../../../store/facade';
import { IdIn } from '../../../../core/domain/inputs';
import { FiltrarSeguimientoOut,
         UserPerfilOut, 
         ConsultarUnSeguimientoOut } from '../../../../core/domain/outputs';
import { RolesUserEnum } from '../../../../core/domain/enums';
import { Observable } from 'rxjs';
import { AgoraClient, ClientEvent, NgxAgoraService, Stream, StreamEvent } from 'ngx-agora';
import { ToastService } from '../../../../services';

@Component({
  selector: 'app-video-chat-room',
  templateUrl: './video-chat-room.component.html',
  styleUrls: ['./video-chat-room.component.css']
})
export class VideoChatRoomComponent implements OnInit, OnDestroy {

  seguimientoPorAtender : ConsultarUnSeguimientoOut
  userProfile$ : Observable<UserPerfilOut>;
  isLoading$: Observable<boolean>;
  showResumen:boolean = false;
  localCallId = 'agora_local';
  remoteCalls: string[] = [];
  remoteStreams: Stream[];
  cargandoLLamada: boolean = true; 
  private client: AgoraClient;
  private localStream: Stream;
  private uid: number;
  isConected: boolean = false;
  rolUser: RolesUserEnum;
  DOCTOR:RolesUserEnum = RolesUserEnum.DOCTOR;

  constructor( private _userFacade: UserFacade,
               private _toastService: ToastService,
               private route:ActivatedRoute,
               private _ngxAgoraService: NgxAgoraService ) {
                this.uid = Math.floor(Math.random() * 100);
              }

  ngOnInit(): void {
    this.userProfile$ = this._userFacade.getPerfilUser();
    this.isLoading$ = this._userFacade.getLoadingPerfilUserStore();
    this.seguimientoPorAtender = this.route.snapshot.data.seguimientoPorAtender;
    this.rolUser = this.route.snapshot.params.rol;

     //for video calling
     this.client = this._ngxAgoraService.createClient({ mode: 'rtc', codec: 'h264' });
     this.assignClientHandlers();
 
     this.localStream = this._ngxAgoraService.createStream({ streamID: this.uid, audio: true, video: true, screen: false });
     this.assignLocalStreamHandlers();
     // Join and publish methods added in this step
     this.initLocalStream(() => this.join(uid => this.publish(), 
      error => {
        this.cargandoLLamada = false;
        this._toastService.showError("Error al unirse a la sala")
        console.error(error)
      }
     
     ));
  }

  onChangeNav({nextId}){
    if(nextId === 'datos-paciente'){
      let userId : IdIn = { _id : this.seguimientoPorAtender.idPaciente._id }
      this._userFacade.loadPerfilUser(userId);
    }
    if(nextId === 'resumen')
    this.showResumen = true;
  }

  /**
   * Attempts to connect to an online chat room where users can host and receive A/V streams.
   */
  join(onSuccess?: (uid: number | string) => void, onFailure?: (error: Error) => void): void {
    this.client.join(null, this.seguimientoPorAtender._id, this.uid, onSuccess, onFailure);
  }

  /**
   * Attempts to upload the created local A/V stream to a joined chat room.
   */
  publish(): void {
    this.client.publish(this.localStream, err => console.log('Publish local stream error: ' + err));
  }

  private assignClientHandlers(): void {
    this.client.on(ClientEvent.LocalStreamPublished, evt => {
      console.log('Publish local stream successfully');
      this.cargandoLLamada = false;
      this.isConected = true;
      this._toastService.showInfo("Se ha unido a la sala con éxito");
    });

    this.client.on(ClientEvent.Error, error => {
      console.log('Got error msg:', error.reason);
      if (error.reason === 'DYNAMIC_KEY_TIMEOUT') {
        this.client.renewChannelKey(
          '',
          () => console.log('Renewed the channel key successfully.'),
          renewError => console.error('Renew channel key failed: ', renewError)
        );
      }
    });

    this.client.on(ClientEvent.RemoteStreamAdded, evt => {
      const stream = evt.stream as Stream;
      this.client.subscribe(stream, { audio: true, video: true }, err => {
        console.log('Subscribe stream failed', err);
      });
    });

    this.client.on(ClientEvent.RemoteStreamSubscribed, evt => {
      const stream = evt.stream as Stream;
      const id = this.getRemoteId(stream);
      if (!this.remoteCalls.length) {
        this.remoteCalls.push(id);
        // this.remoteStreams.push(stream);
        this._toastService.showSuccess("Se ha establecido comunicación con éxito");
        setTimeout(() => stream.play(id), 1000);
      }
    });

    this.client.on(ClientEvent.RemoteStreamRemoved, evt => {
      this._toastService.showInfo("El usuario a salido de la sala");
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = [];
        this.remoteStreams = [];
        console.log(`Remote stream is removed ${stream.getId()}`);
      }
    });

    this.client.on(ClientEvent.PeerLeave, evt => {
      // this._toastService.showInfo('Usted a salido de la sala');
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = this.remoteCalls.filter(call => call !== `${this.getRemoteId(stream)}`);
        // this.remoteStreams = this.remoteStreams.filter(call=>this.getRemoteId(call) !== this.getRemoteId(stream))
        console.log(`${evt.uid} left from this channel`);
        
      }
    });
  }

  private assignLocalStreamHandlers(): void {
    this.localStream.on(StreamEvent.MediaAccessAllowed, () => {
      console.log('accessAllowed');
      this._toastService.showInfo("Permisos de accesos a la cámara y micrófono otorgados exitosamente")
    });

    // The user has denied access to the camera and mic.
    this.localStream.on(StreamEvent.MediaAccessDenied, () => {
      console.log('accessDenied');
      this._toastService.showError("No ha otorgados los accesos a la cámara ni al micrófono")
    });
  }

  private initLocalStream(onSuccess?: () => any): void {
    this.localStream.init(
      () => {
        // The user has granted access to the camera and mic.
        this.localStream.play(this.localCallId);
        if (onSuccess) {
          onSuccess();
        }
      },
      err => console.error('getUserMedia failed', err)
    );
  }

  private getRemoteId(stream: Stream): string {
    return `agora_remote-${stream.getId()}`;
  }

  terminarLlamada(){
    // this.localStream.stop();
    this.client.leave(()=>{
      // Stop playing the local stream
      this.localStream.stop();
      // Close the local stream
      this._toastService.showInfo('Usted a salido de la sala');
      this.localStream.close();
      this.isConected = false;
      
      console.log("client leaves channel success");
    },(err)=>{
        console.log("channel leave failed");
        console.error(err);
    });
  }
  ngOnDestroy(){
    this.terminarLlamada()
  }
} 

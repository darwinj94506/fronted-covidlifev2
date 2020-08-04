import { Component, OnInit, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeguimientoFacade, UserFacade } from '../../../store/facade';
import { Observable } from 'rxjs';
import { FiltrarSeguimientoOut, UserPerfilOut } from '../../../core/domain/outputs';
import { AgoraClient, ClientEvent, NgxAgoraService, Stream, StreamEvent } from 'ngx-agora';

@Component({
  selector: 'app-call-dash',
  templateUrl: './call-dash.component.html',
  styleUrls: ['./call-dash.component.css']
})
export class CallDashComponent implements OnInit {
  calling=false;
  roomName: string
  seguimientosAgendados$: Observable<FiltrarSeguimientoOut[]> 
  title = 'angular-video';
  localCallId = 'agora_local';
  remoteCalls: string[] = [];
  seguimientoPorAtender : FiltrarSeguimientoOut;
  pacientePorAtender$ : Observable<UserPerfilOut>;
  isLoading$: Observable<boolean>; 

  private client: AgoraClient;
  private localStream: Stream;
  private uid: number;

  constructor(
    private _seguimientoFacade: SeguimientoFacade,
    private _ngxAgoraService: NgxAgoraService,
    private _userFacade: UserFacade
  ) { 
    this.uid = Math.floor(Math.random() * 100);
  }

  ngOnInit(): void {  

    this.seguimientosAgendados$ = this._seguimientoFacade.getSeguimientosAgendadosStore();
    this._seguimientoFacade.loadSeguimientosAgendados();
    this.pacientePorAtender$ = this._userFacade.getPerfilUser();
    this.isLoading$ = this._userFacade.gerLoadingStore();

    //for video calling
    this.client = this._ngxAgoraService.createClient({ mode: 'rtc', codec: 'h264' });
    this.assignClientHandlers();

    this.localStream = this._ngxAgoraService.createStream({ streamID: this.uid, audio: true, video: true, screen: false });
    this.assignLocalStreamHandlers();
    // Join and publish methods added in this step
    this.initLocalStream(() => this.join(uid => this.publish(), error => console.error(error)));

  }
 
  call(seguimiento:FiltrarSeguimientoOut){
    this.seguimientoPorAtender = {...seguimiento};

  }

  onChangeNav({activeId}){
    if(activeId === 'datos-paciente')
      this._userFacade.loadPerfil({_id: this.seguimientoPorAtender.idPaciente._id})
  }

  /**
   * Attempts to connect to an online chat room where users can host and receive A/V streams.
   */
  join(onSuccess?: (uid: number | string) => void, onFailure?: (error: Error) => void): void {
    this.client.join(null, 'foo-bar', this.uid, onSuccess, onFailure);
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
        setTimeout(() => stream.play(id), 1000);
      }
    });

    this.client.on(ClientEvent.RemoteStreamRemoved, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = [];
        console.log(`Remote stream is removed ${stream.getId()}`);
      }
    });

    this.client.on(ClientEvent.PeerLeave, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = this.remoteCalls.filter(call => call !== `${this.getRemoteId(stream)}`);
        console.log(`${evt.uid} left from this channel`);
      }
    });
  }

  private assignLocalStreamHandlers(): void {
    this.localStream.on(StreamEvent.MediaAccessAllowed, () => {
      console.log('accessAllowed');
    });

    // The user has denied access to the camera and mic.
    this.localStream.on(StreamEvent.MediaAccessDenied, () => {
      console.log('accessDenied');
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

}

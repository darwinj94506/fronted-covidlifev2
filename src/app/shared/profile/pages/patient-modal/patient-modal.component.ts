import { Component, OnInit, Input } from '@angular/core';
import { UserPerfilOut, FiltrarSeguimientoOut } from '../../../../core/domain/outputs';
import { IdIn } from '../../../../core/domain/inputs';
import { Observable, of } from 'rxjs';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { MainFacade, UserFacade } from '../../../../store/facade';
@Component({
  selector: 'app-patient-modal',
  templateUrl: './patient-modal.component.html',
  styleUrls: ['./patient-modal.component.css']
})
export class PatientModalComponent implements OnInit {
  @Input() seguimiento: FiltrarSeguimientoOut;
  isLoadingPerfilUser$: Observable<boolean>;
  showResumen:boolean = false;
  
  userPerfil$: Observable<UserPerfilOut>;

  constructor( public modal: NgbActiveModal, 
               private _userFacade: UserFacade) {}
  ngOnInit(){
    this.userPerfil$ = this._userFacade.getPerfilUser();
    this.isLoadingPerfilUser$ = this._userFacade.getLoadingPerfilUserStore();
  } 

  onChangeNav({nextId}){
    if(nextId === 'datos-personales'){
      let userId : IdIn = { _id : this.seguimiento.idPaciente._id }
      this._userFacade.loadPerfilUser(userId);
    }
    if(nextId === 'resumen')
      this.showResumen = true;
    
  }

}

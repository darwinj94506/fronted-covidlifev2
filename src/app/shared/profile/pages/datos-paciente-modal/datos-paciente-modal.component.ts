import { Component, OnInit, Input} from '@angular/core';
import { UserPerfilOut, FiltrarSeguimientoOut } from '../../../../core/domain/outputs';
import { IdIn } from '../../../../core/domain/inputs';
import { Observable, of } from 'rxjs';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { UserFacade } from '../../../../store/facade';
import { FilterUserOut } from '../../../../core/domain/outputs';

@Component({
  selector: 'app-datos-paciente-modal',
  templateUrl: './datos-paciente-modal.component.html',
  styleUrls: ['./datos-paciente-modal.component.css']
})
export class DatosPacienteModalComponent implements OnInit {
  @Input() paciente: FilterUserOut;
  isLoadingPerfilUser$: Observable<boolean>;
  showResumen:boolean = false;
  
  userPerfil$: Observable<UserPerfilOut>;

  constructor( public modal: NgbActiveModal, 
    private _userFacade: UserFacade) {}
  ngOnInit(){
    this.userPerfil$ = this._userFacade.getPerfilUser();
    this.isLoadingPerfilUser$ = this._userFacade.getLoadingPerfilUserStore();
    let userId : IdIn = { _id : this.paciente._id }
    this._userFacade.loadPerfilUser(userId);
  } 

  onChangeNav({nextId}){
    if(nextId === 'resumen')
    this.showResumen = true;

  }
}

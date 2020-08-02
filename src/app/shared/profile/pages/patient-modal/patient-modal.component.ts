import { Component, OnInit, Input } from '@angular/core';
import { UserPerfilOut, FiltrarSeguimientoOut } from '../../../../core/domain/outputs';
import { Observable, of } from 'rxjs';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-patient-modal',
  templateUrl: './patient-modal.component.html',
  styleUrls: ['./patient-modal.component.css']
})
export class PatientModalComponent implements OnInit {
  @Input() userPerfil: UserPerfilOut;
  @Input() seguimiento: FiltrarSeguimientoOut;
  
  userPerfil$: Observable<UserPerfilOut>;

  constructor( public modal: NgbActiveModal) {}
  ngOnInit(){
    console.log(this.userPerfil);
    this.userPerfil$ = of(this.userPerfil);
  } 

}

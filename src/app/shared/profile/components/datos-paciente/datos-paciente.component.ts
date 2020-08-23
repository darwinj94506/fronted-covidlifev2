import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPerfilOut } from '../../../../core/domain/outputs';
@Component({
  selector: 'app-datos-paciente',
  templateUrl: './datos-paciente.component.html',
  styleUrls: ['./datos-paciente.component.css']
})
export class DatosPacienteComponent implements OnInit {
  @Input () userPerfil$:Observable<UserPerfilOut>;

  constructor() { }

  ngOnInit(): void {
  }
  
  getResult(value: boolean): String{
    if(value)
      return 'sí'
    else 
      return 'No'
  }

}

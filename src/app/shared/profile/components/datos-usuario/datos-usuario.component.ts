import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPerfilOut } from '../../../../core/domain/outputs';
@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.css']
})
export class DatosUsuarioComponent implements OnInit {

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

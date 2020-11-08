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

  convertDate(t): Date{
    let today = new Date(t);
		return new Date(
      today.getFullYear(), today.getUTCMonth(), today.getUTCDate(),
      today.getUTCHours(), today.getUTCMinutes(), today.getUTCSeconds())
  }

  getAnios(date){
    let b = date.split(/\D/);
    // console.log(date);
    // console.log(this.convertDate(date));
    var today = new Date();
    var birthDate = new Date(b[0], --b[1], b[2]);

    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
    }
    return age;
  }
  


}

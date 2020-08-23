import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPerfilOut } from '../../../../core/domain/outputs';
@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {
  @Input () userPerfil$:Observable<UserPerfilOut>;
  constructor() { }

  ngOnInit(): void {
  }

}

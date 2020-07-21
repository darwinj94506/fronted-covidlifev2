import { Component, OnInit, Input, Injector, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Formulario } from '../../../../../core/domain/class/formulario';
import { Observable } from 'rxjs';
import { IHospitalEntity } from '../../../../../core/domain/entities';
const VALIDATION_MESSAGE =  {
  nombre: { required: 'El Nombre es obligatorio' },
  idEspacio:{ required: 'La ubicación es obligatoria'}
}

@Component({
  selector: 'app-form-hospital',
  templateUrl: './form-hospital.component.html',
  styleUrls: ['./form-hospital.component.css']
})
export class FormHospitalComponent extends Formulario implements OnInit {

  @Input() hospitales: IHospitalEntity [];

  formulario: FormGroup;
  isLoading$: Observable<boolean>;
   
  constructor( private fb: FormBuilder, 
               injector: Injector) {
        super({...VALIDATION_MESSAGE}, injector)
     }
  
  ngOnInit(): void {
  }

  onSubmit(){
    
  }
  
  initForm(){
    
  }

}

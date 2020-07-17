import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EspacioEnum } from '../../../../../core/domain/enums';
import { IEspacioEntity } from '../../../../../core/domain/entities';
import { EspacioFacade } from '../../../store/facades';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() espacio: IEspacioEntity;

  formulario: FormGroup;
  
  ValidationMessage = {
    nombre: { required: 'El Nombre es obligatorio' },
  }

  formsErrors = {
  }

  constructor(public activeModal: NgbActiveModal,
     private fb: FormBuilder, 
     private _espacioFacade : EspacioFacade) {}

  ngOnInit(): void {
    this.initForm();
  }
  getTitulo(){
    switch(this.espacio.tipo){
      case EspacioEnum.PROVINCIA:
        return 'Provincia';
      case EspacioEnum.CANTON:
        return 'Cantón'  
      case EspacioEnum.PARROQUIA:
        return 'Parroquia'
    }
  }

  onSubmit(){
    if(this.espacio._id)
      this.update()
    else
      this.create()
  }

  create(){
    let espacio: IEspacioEntity = { 
      nombre: this.formulario.get('nombre').value,  
      tipo: this.espacio.tipo  
    };
    this._espacioFacade.crearEspacio(espacio)
  }

  update(){
    let espacio: IEspacioEntity = { 
      _id: this.espacio._id,
      nombre: this.formulario.get('nombre').value,
      tipo: this.espacio.tipo  
    };
    this._espacioFacade.actualizarEspacio(espacio)
  }

  initForm(){
    this.formulario = this.fb.group({
      nombre: [ this.espacio.nombre , Validators.required]         
    });
  }

  logValidationErrors(group: FormGroup) {
    Object.keys(group.controls).forEach((key: string) => {
        const ac = group.get(key);
        this.formsErrors[key] = '';
        if (ac && !ac.valid && (ac.touched || ac.dirty)) {
            const message = this.ValidationMessage[key];
            for (const errorKey in ac.errors) {
                if (errorKey) {
                    this.formsErrors[key] += message[errorKey] + '    ';
                }
            }
        }
        if (ac instanceof FormGroup) {
            this.logValidationErrors(ac)
        }
    })
  }
}

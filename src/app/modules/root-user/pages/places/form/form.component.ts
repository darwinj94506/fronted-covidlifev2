import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EspacioEnum } from '../../../../../core/domain/enums';
import { IEspacioEntity } from '../../../../../core/domain/entities';
import { EspacioFacade } from '../../../store/facades';
import { Formulario } from '../../../../../core/domain/class/formulario';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
const VALIDATION_MESSAGE =  {
  nombre: { required: 'El Nombre es obligatorio' }
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent extends Formulario implements OnInit {

  @Input() espacio: IEspacioEntity;

  formulario: FormGroup;
  isLoading$: Observable<boolean>;
   
  constructor( private fb: FormBuilder,
               public activeModal: NgbActiveModal,
               private _espacioFacade : EspacioFacade) {
        super({...VALIDATION_MESSAGE})
     }
 
  
  ngOnInit(): void {
    this.initForm();
    this.listenerLoading();
  }
  

  getTitulo(){
    switch(this.espacio.tipo){
      case EspacioEnum.PROVINCIA:
        return 'Provincia';
      case EspacioEnum.CANTON:
        return 'Cantón'  
      case EspacioEnum.PARROQUIA:
        return 'Parroquia'
      case EspacioEnum.BARRIO:
        return 'Barrio'
    }
  }

  listenerLoading(){
    switch(this.espacio.tipo){
      case EspacioEnum.PROVINCIA:
        this.isLoading$ = this._espacioFacade.getLoadingProvincias()
        break;
      case EspacioEnum.CANTON:
        this.isLoading$ = this._espacioFacade.getLoadingCantones()
        break;
      case EspacioEnum.PARROQUIA:
        this.isLoading$ = this._espacioFacade.getLoadingParroquias()
        break;
      case EspacioEnum.BARRIO:
        this.isLoading$ = this._espacioFacade.getLoadingBarrios()
        break;
    }

  }

  onSubmit(){
    if(this.espacio._id)
      this.update()
    else
      this.create()
  }

  create(){
   let espacio:IEspacioEntity = this.getEspacio(); 
   console.log(espacio);
    this._espacioFacade.crearEspacio(espacio)
  }

  update(){
    let espacio: IEspacioEntity = { 
      _id: this.espacio._id,
      ...this.getEspacio()
    };
    this._espacioFacade.actualizarEspacio(espacio)
  }

  getEspacio():IEspacioEntity{
    if(this.espacio.tipo===EspacioEnum.PROVINCIA)
        return {
          nombre:this.formulario.get('nombre').value,
          tipo:this.espacio.tipo
        }
    return {
        nombre:this.formulario.get('nombre').value,
        tipo:this.espacio.tipo,
        idEspacio:this.espacio.idEspacio
      }      
  }

  initForm(){
    this.formulario = this.fb.group({
      nombre: [ this.espacio.nombre , Validators.required]         
    });
  }

}

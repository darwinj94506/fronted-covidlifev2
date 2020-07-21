import { Component, OnInit, Input, Injector, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EspacioEnum } from '../../../../../core/domain/enums';
import { IEspacioEntity } from '../../../../../core/domain/entities';
import { EspacioFacade } from '../../../store/facades';
import { Formulario } from '../../../../../core/domain/class/formulario';
import { Observable } from 'rxjs';
const VALIDATION_MESSAGE =  {
  nombre: { required: 'El Nombre es obligatorio' }
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent extends Formulario implements OnInit, OnDestroy {

  @Input() espacio: IEspacioEntity;

  formulario: FormGroup;
  isLoading$: Observable<boolean>;
   
  constructor( private fb: FormBuilder, 
               injector: Injector,
               private _espacioFacade : EspacioFacade) {
        super({...VALIDATION_MESSAGE}, injector)
     }

  
  ngOnInit(): void {
    this.initForm();
    this.loadingListener();
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

  loadingListener(){
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

    this.suscription = this.isLoading$.subscribe(isLoading=> {
      if(isLoading)
        this.spinner.show()
      else
        this.spinner.hide()
    });
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

  ngOnDestroy(){
    this.suscription.unsubscribe();
  }

}

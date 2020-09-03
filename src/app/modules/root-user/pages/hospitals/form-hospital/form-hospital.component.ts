import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Formulario } from '../../../../../core/domain/class/formulario';
import { Observable } from 'rxjs';
import { IHospitalEntity } from '../../../../../core/domain/entities';
import { FilterEspaceIn } from '../../../../../core/domain/inputs';
import { EspacioFacade, HospitalFacade } from '../../../store/facades';
import { EspacioEnum } from '../../../../../core/domain/enums';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
const VALIDATION_MESSAGE =  {
  nombre: { required: 'El Nombre es obligatorio' },
  idEspacio:{ required: 'La ubicación es obligatoria'}
}

@Component({
  selector: 'app-form-hospital',
  templateUrl: './form-hospital.component.html',
  styleUrls: ['./form-hospital.component.css']
})
export class FormHospitalComponent extends Formulario implements OnInit{

  @Input() hospital: IHospitalEntity;

  formulario: FormGroup;
  isLoading$: Observable<boolean>;
  provincias = []
  cantones = []
  parroquias = []
  barrios = []
   
  constructor( private fb: FormBuilder, 
               private _hospitalFacade : HospitalFacade,
               private _espacioFacade : EspacioFacade,
               public activeModal: NgbActiveModal) {
        super({...VALIDATION_MESSAGE})
     }
  
  ngOnInit(): void {
    this.initForm();
    this.loadProvinces();
    this._espacioFacade.getProvincias().subscribe(data=>this.provincias=data);
    this._espacioFacade.getCantones().subscribe(data=>this.cantones=data);
    this._espacioFacade.getParroquias().subscribe(data =>this.parroquias=data);
    this._espacioFacade.getBarrios().subscribe(data=>this.barrios=data);
    
  }

  onSubmit(){
    if(this.hospital._id)
      this.update();
    else 
      this.create()
  }

  create(){
    let hospital: IHospitalEntity = {
      nombre: this.formulario.get('nombre').value,
      description : this.formulario.get('description').value,
      idEspacio : this.getLastSpaceSelected()
    }
    this._hospitalFacade.crearHospital(hospital);
  }

  update(){
    let hospital: IHospitalEntity = {
      _id:this.hospital._id,
      nombre: this.formulario.get('nombre').value,
      description : this.formulario.get('description').value,
      idEspacio : this.getLastSpaceSelected()
    } 
    this._hospitalFacade.actualizarHospital(hospital);  
  }
  
  initForm(){
    this.formulario = this.fb.group({
      nombre: [ this.hospital.nombre , Validators.required],
      description : this.hospital.description,
      provincia: [null, Validators.required],
      canton:null,
      parroquia:null,
      barrio:null        
    });
  }

  loadProvinces(){
    let filtro : FilterEspaceIn = { tipo: EspacioEnum.PROVINCIA }
    this._espacioFacade.cargarEspacios(EspacioEnum.PROVINCIA, filtro);
  }

  getLastSpaceSelected(){
    let spaceArray = [ this.formulario.get('barrio').value,
                       this.formulario.get('parroquia').value,
                       this.formulario.get('canton').value,
                       this.formulario.get('provincia').value ]
    for (let i = 0 ; i < 4; i++)
      if(spaceArray[i]) return spaceArray[i] 
  }

  onChangeProvince($event) {
    this.formulario.patchValue({
       canton:null,
       parroquia:null,
       barrio:null
    });  
    this.cantones=[];
    this.parroquias=[];
    this.barrios=[]
    
    if($event){
      let filtro : FilterEspaceIn = { idEspacioPadre : $event._id }
      this._espacioFacade.cargarEspacios(EspacioEnum.CANTON, filtro)
    }
  }

  onChangeCanton($event){
    this.parroquias=[];
    this.barrios=[];
    this.formulario.patchValue({
       parroquia:null,
       barrio:null
    });
    if($event){
      let filtro : FilterEspaceIn = { idEspacioPadre : $event._id }
      this._espacioFacade.cargarEspacios(EspacioEnum.PARROQUIA, filtro)
    }
  }

  onChangeParroquia($event){
    this.barrios=[];
     this.formulario.patchValue({
       barrio:null
    })
    if($event){
      let filtro : FilterEspaceIn = { idEspacioPadre : $event._id }
      this._espacioFacade.cargarEspacios(EspacioEnum.BARRIO, filtro)
    }
  }

}

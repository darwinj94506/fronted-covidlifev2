import { Component, OnInit } from '@angular/core';
import { IEspacioEntity } from '../../../../core/domain/entities';
import { MainFacade } from '../../../../store/facade';
import { Observable } from 'rxjs';
import { FilterEspaceIn } from 'src/app/core/domain/inputs';
import { EspacioEnum } from 'src/app/core/domain/enums';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.css']
})
export class FilterModalComponent implements OnInit {
  formulario: FormGroup;
  provincias: IEspacioEntity[];
  cantones: IEspacioEntity[];
  parroquias: IEspacioEntity[];
  barrios: IEspacioEntity[];
  isLoadingProvincias$:Observable<boolean>;
  isLoadingCantones$:Observable<boolean>;
  isLoadingParroquias$:Observable<boolean>;
  isLoadingBarrios$:Observable<boolean>;
  constructor( private _mainFacade: MainFacade, 
    private fb: FormBuilder,
    public activeModal: NgbActiveModal ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadProvinces();
    this._mainFacade.getProvinciasFromStorage().subscribe(data=> this.provincias = data);
    this._mainFacade.getCantonesFromStorage().subscribe(data=> this.cantones = data);
    this._mainFacade.getParroquiasFromStorage().subscribe(data=> this.parroquias = data);
    this._mainFacade.getBarriosFromStorage().subscribe(data=> this.barrios = data);
    this.isLoadingProvincias$=this._mainFacade.getIsLoadingParroquias();
    this.isLoadingCantones$=this._mainFacade.getIsLoadingCantones();
    this.isLoadingParroquias$=this._mainFacade.getIsLoadingParroquias();
    this.isLoadingBarrios$=this._mainFacade.getIsLoadingBarrios();
  }

  initForm(){
    this.formulario = this.fb.group({
      provincia: [null, Validators.required],
      canton:null,
      parroquia:null,
      barrio:null        
    });
  }

  loadProvinces(){
    let filtro : FilterEspaceIn = { tipo: EspacioEnum.PROVINCIA }
    this._mainFacade.distatchActionLoadEspacios(EspacioEnum.PROVINCIA, filtro);
  }

  onChangeProvince($event) {
    this.formulario.patchValue({
       canton: null,
       parroquia: null,
       barrio: null
    });  
    
    if($event){
      let filtro : FilterEspaceIn = { idEspacioPadre : $event._id }
      this._mainFacade.distatchActionLoadEspacios(EspacioEnum.CANTON, filtro)
    }
  }

  onChangeCanton($event){
    this.formulario.patchValue({
       parroquia:null,
       barrio:null
    });
    if($event){
      let filtro : FilterEspaceIn = { idEspacioPadre : $event._id }
      this._mainFacade.distatchActionLoadEspacios(EspacioEnum.PARROQUIA, filtro)
    }
  }

  onChangeParroquia($event){
     this.formulario.patchValue({
       barrio:null
    })
    if($event){
      let filtro : FilterEspaceIn = { idEspacioPadre : $event._id }
      this._mainFacade.distatchActionLoadEspacios(EspacioEnum.BARRIO, filtro)
    }
  }


  onSubmit(){
    // console.log(this.getLastSpaceSelected());
    // this.lugarSeleccionado = this.getLastSpaceSelected();
    this.activeModal.close(this.getLastSpaceSelected())

  }

  getLastSpaceSelected(){
    let spaceArray = [ this.formulario.get('barrio').value,
                       this.formulario.get('parroquia').value,
                       this.formulario.get('canton').value,
                       this.formulario.get('provincia').value ]
    for (let i = 0 ; i < 4; i++)
      if(spaceArray[i]) return spaceArray[i] 
  }
  
}

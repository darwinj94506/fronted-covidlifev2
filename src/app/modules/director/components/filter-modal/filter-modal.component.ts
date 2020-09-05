import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { IEspacioEntity } from '../../../../core/domain/entities';
import { MainFacade } from '../../../../store/facade';
import { Observable, Subject } from 'rxjs';
import { FilterEspaceIn, VerEspacioIn, ContadoresEstadisticaIn, MapasDatosIn } from 'src/app/core/domain/inputs';
import { EspacioEnum, RolesUserEnum, EstadisticaTipoEnum } from 'src/app/core/domain/enums';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { VerEspacioOut } from '../../../../core/domain/outputs';
import { EstadisticasFacade } from '../../store/estadisticas.facade';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.css']
})
export class FilterModalComponent implements OnInit, OnDestroy{
  private _destroyed$ = new Subject();
  @Input() espacio: VerEspacioOut;
  @Input() idHospital: String; 
  @Input() forMapas: boolean = false;

  formulario: FormGroup;
  provincias: IEspacioEntity[];
  cantones: IEspacioEntity[];
  parroquias: IEspacioEntity[];
  barrios: IEspacioEntity[];
  isLoadingProvincias$:Observable<boolean>;
  isLoadingCantones$:Observable<boolean>;
  isLoadingParroquias$:Observable<boolean>;
  isLoadingBarrios$:Observable<boolean>;
  lugares = [null, null, null, null];
  objectLugares = [null, null, null, null];
  constructor( private _mainFacade: MainFacade, 
    private fb: FormBuilder,
    private _estadisticasFacade: EstadisticasFacade,
    public activeModal: NgbActiveModal ) { }

  ngOnInit(): void {

    this._mainFacade.getProvinciasFromStorage().pipe(takeUntil(this._destroyed$)).subscribe(data=> this.provincias = data);
    this._mainFacade.getCantonesFromStorage().pipe(takeUntil(this._destroyed$)).subscribe(data=> this.cantones = data);
    this._mainFacade.getParroquiasFromStorage().pipe(takeUntil(this._destroyed$)).subscribe(data=> this.parroquias = data);
    this._mainFacade.getBarriosFromStorage().pipe(takeUntil(this._destroyed$)).subscribe(data=> this.barrios = data);
    this.isLoadingProvincias$=this._mainFacade.getIsLoadingParroquias();
    this.isLoadingCantones$=this._mainFacade.getIsLoadingCantones();
    this.isLoadingParroquias$=this._mainFacade.getIsLoadingParroquias();
    this.isLoadingBarrios$=this._mainFacade.getIsLoadingBarrios();

    switch(this.espacio.tipo){
      case EspacioEnum.PROVINCIA:
        this.objectLugares[0] = this.espacio
        this.provincias = [{ nombre:this.espacio.nombre.toString(), _id: this.espacio._id.toString(), tipo:this.espacio.tipo }]
        this.formulario = this.fb.group({
          provincia: [this.espacio._id, Validators.required],
          canton:[null],
          parroquia:null,
          barrio:null        
        });
      this._mainFacade.distatchActionLoadEspacios(EspacioEnum.CANTON, { idEspacioPadre: this.espacio._id.toString(), idHospital:this.idHospital })
      break;
      case EspacioEnum.CANTON:
        this.objectLugares[1] = this.espacio
        this.cantones = [{ nombre:this.espacio.nombre.toString(), _id: this.espacio._id.toString(), tipo:this.espacio.tipo }]
        this.formulario = this.fb.group({
          provincia: {value:null, disabled:true},
          canton: [this.espacio._id, Validators.required],
          parroquia:[null],
          barrio:null        
        });
        this._mainFacade.distatchActionLoadEspacios(EspacioEnum.PARROQUIA, { idEspacioPadre: this.espacio._id.toString(), idHospital:this.idHospital })
      break;
      case EspacioEnum.PARROQUIA:
        this.objectLugares[2] = this.espacio
        this.parroquias = [{ nombre:this.espacio.nombre.toString(), _id: this.espacio._id.toString(), tipo:this.espacio.tipo }]
        console.log(this.parroquias);
        this.formulario = this.fb.group({
          provincia: [{value:null, disabled:true}],
          canton: [{value:null, disabled:true}],
          parroquia: [this.espacio._id, Validators.required],
          barrio: [null],        
        });
        this._mainFacade.distatchActionLoadEspacios(EspacioEnum.BARRIO, { idEspacioPadre: this.espacio._id.toString(), idHospital:this.idHospital })
      break;
      case EspacioEnum.BARRIO:
        this.objectLugares[3] = this.espacio
        this.formulario = this.fb.group({
          provincia: [null],
          canton: null,
          parroquia: null,
          barrio:null        
        });
        alert("Solo puede ver las estadísticas de este grupo");
        this.activeModal.dismiss()
      break;
    }

  }

  initForm(){
    this.formulario = this.fb.group({
      provincia: this.lugares[0],
      canton:null,
      parroquia:null,
      barrio:null        
    });
  }

  loadProvinces(idHospital){
    let filtro : FilterEspaceIn = { tipo: EspacioEnum.PROVINCIA, idHospital  }
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

  onChangeCanton(value){
    let canton = this.cantones.find(i=>i._id === value)
    this.objectLugares[1] = canton;
    // console.log($event);
    this.formulario.patchValue({
       parroquia:null,
       barrio:null
    });
    if(value){
      let filtro : FilterEspaceIn = { idEspacioPadre : value, idHospital:this.idHospital }
      this._mainFacade.distatchActionLoadEspacios(EspacioEnum.PARROQUIA, filtro)
    }
  }

  onChangeParroquia(value){
    let parroquia = this.parroquias.find(i=>i._id === value)
    this.objectLugares[2] = parroquia;
     this.formulario.patchValue({
       barrio:null
    })
    if(value){
      let filtro : FilterEspaceIn = { idEspacioPadre : value, idHospital:this.idHospital }
      this._mainFacade.distatchActionLoadEspacios(EspacioEnum.BARRIO, filtro)
    }
  }

  onChangeBarrio(value){
    let barrio = this.barrios.find(i=>i._id === value)
    this.objectLugares[3] = barrio;
  }


  onSubmit(){
    if(this.forMapas)
      this.filterMap(this.getLastSpaceSelected())
    else this.consultar(this.getLastSpaceSelected());
    this.activeModal.close(this.objectLugares);
  }

  getLastSpaceSelected(){
    let spaceArray = [ this.formulario.get('barrio').value,
                       this.formulario.get('parroquia').value,
                       this.formulario.get('canton').value,
                       this.formulario.get('provincia').value ]
    for (let i = 0 ; i < 4; i++)
      if(spaceArray[i]) return spaceArray[i] 
  }

  consultar(idEspacioPadre){
			let filterEvolucion: ContadoresEstadisticaIn = {
				idHospital: this.idHospital,
				role: RolesUserEnum.PACIENTE,
				tipo: EstadisticaTipoEnum.COUNT_PACIENTES_POR_DIA_POR_DIAGNOSTICO,
				idEspacioPadre
			}
			let filterDiagnosticos: ContadoresEstadisticaIn = {
				idHospital: this.idHospital,
				role: RolesUserEnum.PACIENTE,
				tipo: EstadisticaTipoEnum.COUNT_PACIENTES_POR_DIAGNOSTICO,
				idEspacioPadre
			}
			let filterTotalPacientes: ContadoresEstadisticaIn = {
				idHospital: this.idHospital,
				role: RolesUserEnum.PACIENTE,
				tipo: EstadisticaTipoEnum.COUNT_USER_POR_ROLE_AND_HOSPITAL,
				idEspacioPadre
			}
			let filterTotalDoctores: ContadoresEstadisticaIn = {
				idHospital: this.idHospital,
				role: RolesUserEnum.DOCTOR,
				tipo: EstadisticaTipoEnum.COUNT_USER_POR_ROLE_AND_HOSPITAL,
				idEspacioPadre
      } 
      
      this._estadisticasFacade.distpachActionLoadEvolucionDiariaPacientes(filterEvolucion);
			this._estadisticasFacade.distpachActionLoadPacientesPorDiagnostico(filterDiagnosticos);
			this._estadisticasFacade.distpachActionLoadUsuariosPorRol(filterTotalPacientes);
			this._estadisticasFacade.distpachActionLoadUsuariosPorRol(filterTotalDoctores);

		
    } 
    filterMap(idEspacioPadre:String){
      let filtro: MapasDatosIn = {
        tipo: EstadisticaTipoEnum.COUNT_PACIENTES_POR_DIAGNOSTICO,
        idHospital: this.idHospital,
        idEspacioPadre
      }
      this._estadisticasFacade.distpachActionLoadCoordenadasPorDiagnostico(filtro)
    }   
    ngOnDestroy(){
      this._destroyed$.next();
      this._destroyed$.complete();
    }
  
}

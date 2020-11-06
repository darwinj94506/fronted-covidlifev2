import { Component, OnDestroy, OnInit } from '@angular/core';
import { Address } from '../data/formData.model';
import { FormDataService } from '../data/formData.service';
import { WorkflowService } from "../workflow/workflow.service";
import { STEPS } from "../workflow/workflow.model";
import { Router, ActivatedRoute } from "@angular/router";
import { Formulario } from '../../../core/domain/class/formulario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEspacioEntity, IHospitalEntity } from 'src/app/core/domain/entities';
import { Observable, Subject } from 'rxjs';
import { MainFacade } from 'src/app/store/facade';
import { takeUntil } from 'rxjs/operators';
import { FilterEspaceIn } from 'src/app/core/domain/inputs';
import { EspacioEnum, RolesUserEnum } from 'src/app/core/domain/enums';
const ValidationMessage = {
  idHospital: { required: 'Campo obligatorio'},
}
@Component({
    selector: 'mt-wizard-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.scss']
})

export class AddressComponent extends Formulario implements OnInit, OnDestroy {
    title = 'Elija un lugar cerca a su domicilo para que un doctor esté pendiente de usted';
    address: Address;
    form: any;
    hospitalForm: FormGroup;
    private _destroyed$ = new Subject();
    provincias: IEspacioEntity[];
    cantones: IEspacioEntity[];
    parroquias: IEspacioEntity[];
    barrios: IEspacioEntity[];
    hospitales: IHospitalEntity[];
    isLoadingProvincias$:Observable<boolean>;
    isLoadingCantones$:Observable<boolean>;
    isLoadingParroquias$:Observable<boolean>;
    isLoadingBarrios$:Observable<boolean>;
    isLoadingHospitales$:Observable<boolean>;

    constructor(private router: Router,
        private fb: FormBuilder,
        private _mainFacade: MainFacade, 
        private route: ActivatedRoute, private formDataService: FormDataService,
        private workflowService: WorkflowService) {
            super({...ValidationMessage})
    }

    ngOnInit() {
        this.address = this.formDataService.getAddress();
        this._mainFacade.getProvinciasFromStorage().pipe(takeUntil(this._destroyed$)).subscribe(data=> this.provincias = data);
        this._mainFacade.getCantonesFromStorage().pipe(takeUntil(this._destroyed$)).subscribe(data=> this.cantones = data);
        this._mainFacade.getParroquiasFromStorage().pipe(takeUntil(this._destroyed$)).subscribe(data=> this.parroquias = data);
        this._mainFacade.getBarriosFromStorage().pipe(takeUntil(this._destroyed$)).subscribe(data=> this.barrios = data);
        this._mainFacade.getHospitales().pipe(takeUntil(this._destroyed$)).subscribe(data=> this.hospitales = data);
        this._mainFacade.dispatchActionLoadHospitales({});
        this.isLoadingProvincias$=this._mainFacade.getIsLoadingProvinciasFromStorage()
        this.isLoadingCantones$=this._mainFacade.getIsLoadingCantones();
        this.isLoadingParroquias$=this._mainFacade.getIsLoadingParroquias();
        this.isLoadingBarrios$=this._mainFacade.getIsLoadingBarrios();
        this.isLoadingHospitales$=this._mainFacade.getLoadingHospitales();
        this.loadProvinces();
        this.initForm();
    }

    onSubmit(){
        if(this.hospitalForm.invalid){
            alert('datos incorrectos')
            return false;
        }
        this.formDataService.setPacienteHospital(this.hospitalForm.get('idHospital').value)
        this.router.navigate(['result'], { relativeTo: this.route.parent, skipLocationChange: true });

    }

    initForm(){
        // let paciente = this.formDataService.getDataPaciente();
        this.hospitalForm = this.fb.group({
            idHospital: ['', [Validators.required]],
            provincia:'',
            canton:'',
            parroquia:'',
            barrio:''
        });
      }
    //Save button event Starts
    save(form: any) {
        if (!form.valid){
          alert("Eliga un lugar de atención")  
          return;
        }
        // this.formDataService.setAddress(this.address);
        this.formDataService.setPacienteHospital(this.hospitalForm.get('idHospital').value);
        // let firstState = this.workflowService.getFirstInvalidStep(STEPS.work);
        this.router.navigate(['result'], { relativeTo: this.route.parent, skipLocationChange: true });
    }
    //Save button event Ends

    //Cancel button event Starts
    cancel() {
        this.router.navigate(['work'], { relativeTo: this.route.parent, skipLocationChange: true });
    }
    //Cancel button event Ends
    
    loadProvinces(){
      let filtro : FilterEspaceIn = { tipo: EspacioEnum.PROVINCIA}
      this._mainFacade.distatchActionLoadEspacios(EspacioEnum.PROVINCIA, filtro);
    }

    onChangeProvince(value) {
        this.hospitalForm.patchValue({
           canton: null,
           parroquia: null,
           barrio: null,
           idHospital:null
        });  
        if(value){
          let filtro : FilterEspaceIn = { idEspacioPadre : value }
          this._mainFacade.distatchActionLoadEspacios(EspacioEnum.CANTON, filtro)
          this._mainFacade.dispatchActionLoadHospitales({idEspacio: value})
        }
      }
    
      onChangeCanton(value){
        this.hospitalForm.patchValue({
           parroquia:null,
           barrio:null,
           idHospital:null

        });
        if(value){
          let filtro : FilterEspaceIn = { idEspacioPadre : value }
          this._mainFacade.distatchActionLoadEspacios(EspacioEnum.PARROQUIA, filtro)
          this._mainFacade.dispatchActionLoadHospitales({idEspacio: value})
        }
      }
    
      onChangeParroquia(value){
         this.hospitalForm.patchValue({
           barrio:null,
           idHospital:null

        })
        if(value){
          let filtro : FilterEspaceIn = { idEspacioPadre : value }
          this._mainFacade.distatchActionLoadEspacios(EspacioEnum.BARRIO, filtro)
          this._mainFacade.dispatchActionLoadHospitales({idEspacio: value})

        }
      }
    
      onChangeBarrio(value){
        this.hospitalForm.patchValue({
          idHospital:null
       })
        if(value){
          this._mainFacade.dispatchActionLoadHospitales({idEspacio: value})
        }
      }

      onChangeHospital(value){

      }

      loadHospital(idEspacio: string){
        this._mainFacade.dispatchActionLoadHospitales({idEspacio})
      }

      ngOnDestroy(){
        this._destroyed$.next();
        this._destroyed$.complete();
      }
    
}



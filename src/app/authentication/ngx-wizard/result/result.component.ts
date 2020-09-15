import { Component, OnInit, Input, ViewChild, ElementRef }   from '@angular/core';
import { FormData, FormUserData }                   from '../data/formData.model';
import { FormDataService }            from '../data/formData.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthFacade } from '../../store/auth.facade';
import { SignupIn, VOPacienteIn } from 'src/app/core/domain/inputs';

@Component ({
    selector:     'mt-wizard-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.scss']
})

export class ResultComponent implements OnInit {
    title = '¡Muchas gracias!';
    @Input() formData: FormData;
    isFormValid: boolean = false;
    formDataUser: FormUserData;
    terminosCondiciones:boolean = false;
    
    @ViewChild('longContent')
    longContent: ElementRef;
    @ViewChild('content')
    content: ElementRef;

    constructor(private formDataService: FormDataService, 
        private _authFacade: AuthFacade,
        private modalService: NgbModal) {
    }

    ngOnInit() {
        this.formData = this.formDataService.getFormData();
        this.isFormValid = this.formDataService.isFormValid();
        this.formDataUser = this.formDataService.getDataUser();
    }

    // submit() {
    //     if(!this.terminosCondiciones){
    //         this.modalService.open(this.content, { centered: true });
    //         return false 
    //     }
    //     this.formData = this.formDataService.resetFormData ();
    //     this.isFormValid = false;
    // }

    submit(){
        if(!this.terminosCondiciones){
          this.modalService.open(this.content, { centered: true });
          return false 
        }

        let userToRegister : SignupIn = this.formDataService.getDataUser()
    
        if(!this.formDataService.isDoctor){      
          let datosPaciente : VOPacienteIn = this.formDataService.getDataPaciente()
          let rol= this.formDataService.getHospitalRol();
          userToRegister = {
            ...userToRegister,
            roles:[{...rol}],
            datos_paciente: { ...datosPaciente }
          }
        }
        this._authFacade.register(userToRegister)
      }
    










    //Submit button event Ends
    onCheckboxChange(e) {
        if (e.target.checked) {
          this.terminosCondiciones=true;
        } else {
          this.terminosCondiciones=false;
        }
    }

    verTerminosCondiciones(){
        this.modalService.open(this.longContent, { scrollable: true });
    }
}

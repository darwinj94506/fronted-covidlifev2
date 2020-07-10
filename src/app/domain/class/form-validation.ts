import { Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {Subscription} from 'rxjs' 
import { NgxSpinnerService } from 'ngx-spinner';

export abstract class FormValidation {
    private toastr: ToastrService;
    spinner: NgxSpinnerService
    suscription: Subscription;
    
    ValidationMessage = {
    }
    
    formsErrors = {
    }

    constructor( ValidationMessage, injector: Injector){
        this.toastr = injector.get(ToastrService);
        this.ValidationMessage = { ...ValidationMessage };
        this.spinner = injector.get(NgxSpinnerService);
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

    showSuccess(msg) {
        this.toastr.success(msg);
      }
      
      showError(msg) {
        this.toastr.error(msg);
      }

    abstract initForm(): void;

    abstract onSubmit():void;



}
import { Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs' 
import { NgxSpinnerService } from 'ngx-spinner';

export abstract class Formulario {
    spinner: NgxSpinnerService
    suscription: Subscription;
    
    ValidationMessage = {
    }
    
    formsErrors = {
    }

    constructor( ValidationMessage, injector: Injector){
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


    abstract initForm(): void;

    abstract onSubmit():void;



}
import { FormGroup } from '@angular/forms';

export abstract class Formulario {
    
    ValidationMessage = {
    }
    
    formsErrors = {
    }

    constructor( ValidationMessage){
        this.ValidationMessage = { ...ValidationMessage };
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
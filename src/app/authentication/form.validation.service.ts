import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// @Injectable({ providedIn: 'root'})
export class FomValidationService {
    
    formsErrors={};
    ValidationMessage={}
    
    constructor(){
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


}

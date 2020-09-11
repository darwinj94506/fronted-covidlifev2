import { Component, OnInit, Input }   from '@angular/core';
import { FormData, FormUserData }                   from '../data/formData.model';
import { FormDataService }            from '../data/formData.service';

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
    
    constructor(private formDataService: FormDataService) {
    }

    ngOnInit() {
        this.formData = this.formDataService.getFormData();
        this.isFormValid = this.formDataService.isFormValid();
        this.formDataUser = this.formDataService.getDataUser();
       
    }

    //Submit button event Starts
    submit() {
        alert('Excellent Job!');
        this.formData = this.formDataService.resetFormData ();
        this.isFormValid = false;
    }
    //Submit button event Ends
}

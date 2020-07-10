import { Component, OnInit, Input, OnChanges} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProvinceFacade } from '../../../../store/facades/province.facade';
@Component({
  selector: 'app-province-form',
  templateUrl: './province-form.component.html'
})
export class ProvinceFormComponent implements OnInit{

  @Input() province: any;

  editProvince: FormGroup;
  
  ValidationMessage = {
    name: { required: 'El Nombre es obligatorio' },
  }

  formsErrors = {
  }

  constructor(public activeModal: NgbActiveModal,
     private fb: FormBuilder, private storeProvinceFacade: ProvinceFacade) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(){
    let provinceToSave = { 
      name: this.editProvince.get('name').value  
    };
    
    let provinceToUpdate = { 
      _id: this.province._id,
      name: this.editProvince.get('name').value  
    };
    if(this.province._id === ""){
      this.storeProvinceFacade.addProvince(provinceToSave)
    }else{
      this.storeProvinceFacade.updateProvince(provinceToUpdate)
    }

  }

  initForm(){
    this.editProvince = this.fb.group({
      name: [this.province.name, Validators.required]         
    });
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

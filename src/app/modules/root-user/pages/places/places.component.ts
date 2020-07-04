import { Component, OnInit } from '@angular/core';
import { ProvinceFacade } from '../../store/facades/province.facade';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProvinceService } from '../../services/province.service';
@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  public provinces : any[] = [];
  public isLoading = false;
  public errorMessage = ""

  suscription : Subscription; 
  page = 1;
  pageSize = 7;

  editProvince: FormGroup;
  provinceDetail: any = null;

  ValidationMessage = {
    name: { required: 'El Nombre es obligatorio' },
  }

  formsErrors = {
  }

  constructor( private _provinceFacade: ProvinceFacade, private _p:ProvinceService,
    private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.initForm();
    this.initStore();
  }

  initForm(){
    this.editProvince = this.fb.group({
      id: [''],
      name: ['', Validators.required],         
    });
  }

  initStore(){
    this._provinceFacade.loadProvinces();
    this.suscription = this._provinceFacade.getPaymentMethodsList().pipe(
      map(({province})=>({...province})))
      .subscribe( (store:any) => {
        console.log(store);
        this.provinces = store.provinces;
        this.errorMessage = store.error;
        this.isLoading = store.isLoading;     
      })
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


openModal(targetModal) {
  this._provinceFacade.openModal(targetModal, null);

  }

  onSubmit() {
    if (this.provinceDetail != null) {
        this.provinceDetail.name = this.editProvince.get('name').value;
    }
    else {
      this.provinceDetail['name'] = this.editProvince.get('name').value;
    }
    this._provinceFacade.addProvince(this.provinceDetail);    
    this.provinceDetail = null;

  }

  closeBtnClick() {
      this._provinceFacade.closeModal()
  }

}

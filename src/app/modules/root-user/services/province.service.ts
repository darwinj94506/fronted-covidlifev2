import { Injectable } from '@angular/core';
import { IProvince } from '../../../domain';
import { ProvinceMDBRepository } from '../../../_detail';
import { Observable, from } from 'rxjs';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { ProvinceFormComponent } from '../pages/places/province/province-form/province-form.component';
import { ConfirmModalComponent } from '../../../ui/components/confirm-modal/confirm-modal.component';
@Injectable()
export class ProvinceService {
    modalCreateUpdateRef: NgbModalRef;
    constructor( private repository: ProvinceMDBRepository, private modalService: NgbModal ){}

    public getProvinces() : Observable<IProvince[]>{
        return this.repository.all()
    }

    public createProvince(province:IProvince): Observable<IProvince>{
        return this.repository.create(province)
    }

    public updateProvince(province:IProvince): Observable<IProvince>{
        console.log(province);
        return this.repository.update(province)
    }

    public deleteProvince(province:IProvince): Observable<IProvince>{
        let provinceToDelete:IProvince = { _id:province._id, name:province.name }
        return this.repository.delete(provinceToDelete)
    }

    public openModalCreateUpdate(province) {
        console.log(province);
        this.modalCreateUpdateRef = this.modalService.open(ProvinceFormComponent, { centered: true })
        this.modalCreateUpdateRef.componentInstance.province = {...province};
        
    };

    public closeModalCreateUpdate() {
        this.modalCreateUpdateRef.dismiss()
    };

    

    public showConfirm(){
        const modalRef = this.modalService.open(ConfirmModalComponent)
        return from(modalRef.result)
    }

}
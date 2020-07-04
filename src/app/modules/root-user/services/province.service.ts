import { Injectable } from '@angular/core';
import { IProvince } from '../../../domain';
import { ProvinceMDBRepository } from '../../../_detail';
import { Observable } from 'rxjs';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
@Injectable()
export class ProvinceService {
    modalCreateUpdate: NgbActiveModal;
    constructor( private repository: ProvinceMDBRepository, private modalService: NgbModal ){}

    // public provinces: Observable<IProvince[]>;

    public getProvinces() : Observable<IProvince[]>{
        // this.provinces = this.repository.all();
        return this.repository.all()
    }

    public createProvince(province:IProvince): Observable<IProvince>{
        return this.repository.save(province)
    }

    openModalCreateUpdate(targetHtml){
       return this.modalService.open(targetHtml, {
            centered: true,
            backdrop: 'static'})
    }

    closeModalCreateUpdate(){
        console.log("closeModal")
    }

}
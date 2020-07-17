import { Injectable } from '@angular/core';
import { IProvince } from '../../../domain';
import { Observable, from } from 'rxjs';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { FormComponent } from '../pages';
import { ConfirmModalComponent } from '../../../ui/components/confirm-modal/confirm-modal.component';
@Injectable({ providedIn: 'root' })
export class EspacioService {
    modalCreateUpdateRef: NgbModalRef;
    constructor( private modalService: NgbModal ){}

    public openModalCreateUpdate(province) {
        this.modalCreateUpdateRef = this.modalService.open( FormComponent, { centered: true })
        this.modalCreateUpdateRef.componentInstance.espacio = {...province};
    };

    public closeModalCreateUpdate() {
        this.modalCreateUpdateRef.dismiss()
    };

    public showConfirm(){
        const modalRef = this.modalService.open(ConfirmModalComponent)
        return from(modalRef.result)
    }

}
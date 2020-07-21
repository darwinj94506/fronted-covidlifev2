import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormComponent } from '../pages/places/form/form.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmModalComponent } from '../../../ui/components/confirm-modal/confirm-modal.component';
@Injectable({ providedIn: 'root' })
export class EspacioService {
    modalCreateUpdateRef: NgbModalRef;
    constructor( private modalService: NgbModal, private toastr: ToastrService ){}

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

    showSuccess(msg) {
        this.toastr.success(msg);
    }
      
    showError(msg) {
    this.toastr.error(msg);
    }

}
import { Injectable, Injector } from '@angular/core';
import { IEntity } from '../../../core/domain/entities';
import { GenericRepository } from '../../../core/repositories/generic-repository';
import {Apollo} from 'apollo-angular';
import { map } from 'rxjs/operators';
import { IOperations } from '../../graphq';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../../../ui/components/confirm-modal/confirm-modal.component';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
export class GenerciFakeDbRepository<T  extends IEntity> implements GenericRepository<T>{
    source: string;
    baseUrl: string = "/api";
    private modalCreateUpdateRef: NgbModalRef;
    private modalService: NgbModal;
    private modalCreateUpdate: any;
    private http:HttpClient;

    constructor(source : string, ModalCreateUpdate: any, injector: Injector){
    
        this.source = source;
        this.modalCreateUpdate = injector.get(NgbModal);
        this.http = injector.get(HttpClient)
    }
    
    create(entity:T): Observable<any | null> {
        return this.http.post(`${this.baseUrl}/${this.source}`,{ ...entity })
    }
    
    update(entity:T): Observable<any | null> {
        return this.http.put(`${this.baseUrl}/${this.source}`, { ...entity })
    }
    
    delete(entity:T): Observable<any | null> {
        return this.http.delete(`${this.baseUrl}/${this.source}/${entity._id}`)
    }

    all(): Observable<any | null> {
        return this.http.get(`${this.baseUrl}/${this.source}`)
    }

    openModalCreateUpdate(entity: T) {
        this.modalCreateUpdateRef = this.modalService.open(this.modalCreateUpdate, { centered: true })
        this.modalCreateUpdateRef.componentInstance.province = {...entity};
        
    };

    closeModalCreateUpdate() {
        this.modalCreateUpdateRef.dismiss()
    };

    showConfirm(){
        const modalRef = this.modalService.open(ConfirmModalComponent)
        return from(modalRef.result)
    }


}
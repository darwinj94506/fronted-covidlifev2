import { Injectable, Injector } from '@angular/core';
import { IEntity} from  '../../../core/domain/entities';
import { GenericRepository } from '../../../core/repositories/generic-repository';
import {Apollo} from 'apollo-angular';
import { map } from 'rxjs/operators';
import { IOperations } from '../../graphq';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../../../ui/components/confirm-modal/confirm-modal.component';
import { Observable, from } from 'rxjs';

export class MongoDBRepository<T  extends IEntity> implements GenericRepository<T>{
    protected apollo: Apollo
    private operations: IOperations;
    
    private modalCreateUpdateRef: NgbModalRef;
    private modalService: NgbModal;
    private modalCreateUpdate: any;

    constructor(operations : IOperations, ModalCreateUpdate: any ,injector: Injector){
        this.apollo = injector.get(Apollo);
        this.operations = operations;
        this.modalCreateUpdate = injector.get(NgbModal);
    }
    
    create(entity:T): Observable<any | null> {
        return this.apollo.mutate({
            mutation: this.operations.create.gql,
            variables: {
              data: entity
            },
            
          }).pipe(
              map(( { data } )=> data[this.operations.create.resolve] ))
    }
    
    update(entity:T): Observable<T | null> {
        return this.apollo.mutate({
            mutation: this.operations.update.gql,
            variables: {
              data: entity
            },           
          }).pipe(
              map(( { data } )=> data[this.operations.update.resolve] ))
    }
    
    delete(entity:T): Observable<T | null> {
        return this.apollo.mutate({
            mutation: this.operations.delete.gql,
            variables: {
              data: entity
            },           
          }).pipe(
              map(( { data } )=> data[this.operations.delete.resolve] ))
    }

    // all(): Observable<T[] | null> {
    //     return this.apollo
    //     .watchQuery({query: this.operations.all.gql})
    //     .valueChanges.pipe(
    //         map(( { data } ) => data[this.operations.all.resolve] ))
    // }

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
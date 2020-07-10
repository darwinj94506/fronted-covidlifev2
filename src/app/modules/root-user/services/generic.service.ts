import { Injectable } from '@angular/core';
import { IProvince } from '../../../domain';
import { CantonMDBRepository } from '../../../_detail';
import { Observable, from } from 'rxjs';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { ProvinceFormComponent } from '../pages/places/province/province-form/province-form.component';
import { ConfirmModalComponent } from '../../../ui/components/confirm-modal/confirm-modal.component';

export abstract class GenericService <T> {
    
}
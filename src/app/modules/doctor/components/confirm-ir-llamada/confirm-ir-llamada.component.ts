import {Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FiltrarSeguimientoOut } from '../../../../core/domain/outputs'


@Component({
  selector: 'ngbd-modal-confirm-autofocus',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Confirmar video llamada</h4>
    <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>¿Está seguro que quiere hacer una video llamada con el paciente 
      <span class="text-primary">{{seguimiento.idPaciente.name}} {{seguimiento.idPaciente.lastname}}</span>?</strong>
    </p>
    <p>Al paciente le llegará una notificación para que se una a la video llamada.</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancelar</button>
    <button type="button" ngbAutofocus class="btn btn-danger" (click)="modal.close('Ok click')">Sí</button>
  </div>
  `
})
export class ConfirmIrLlamadaComponent {
  @Input ()  seguimiento: FiltrarSeguimientoOut;
  constructor(public modal: NgbActiveModal) {}
}


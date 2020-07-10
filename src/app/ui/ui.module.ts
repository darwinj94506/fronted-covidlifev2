import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [ConfirmModalComponent],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports:[ConfirmModalComponent],
  entryComponents:[ConfirmModalComponent]
})
export class UiModule { }

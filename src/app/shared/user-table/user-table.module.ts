import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTableComponent } from './user-table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [UserTableComponent],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [
    UserTableComponent
  ]
})
export class UserTableModule { }

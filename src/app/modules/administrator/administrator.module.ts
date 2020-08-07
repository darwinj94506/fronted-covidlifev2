import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { StaffComponent, HospitalComponent } from './pages';
import { UserTableModule } from '../../shared/user-table/user-table.module';
import { ProfileModule } from '../../shared/profile/profile.module';

@NgModule({
  declarations: [StaffComponent, HospitalComponent],
  imports: [
    CommonModule,
    UserTableModule,
    ProfileModule,
    AdministratorRoutingModule
  ]
})
export class AdministratorModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './pages/profile/profile-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TimeLineComponent } from './components/time-line/time-line.component';
import { SettingsComponent } from './components/settings/settings.component';
import { Routes, RouterModule } from '@angular/router';
import { OverViewComponent } from './components/over-view/over-view.component';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientModalComponent } from './pages/patient-modal/patient-modal.component';
import { AtenderSeguimientoComponent } from './components/atender-seguimiento/atender-seguimiento.component';
export const PROFILE_ROUTES: Routes = [
	{
		path: '', component: ProfilePageComponent,
	},
];

@NgModule({
  declarations: [ ProfilePageComponent, ProfileComponent, TimeLineComponent, SettingsComponent, OverViewComponent, PatientModalComponent, AtenderSeguimientoComponent ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(PROFILE_ROUTES),
  ],
  exports:[
    PatientModalComponent,
    ProfileComponent, 
    TimeLineComponent,  
    OverViewComponent, 
    NgbModule, 
    NgbModalModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  entryComponents:[
    PatientModalComponent,
    
    
  ]
})
export class ProfileModule { }

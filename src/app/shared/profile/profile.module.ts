import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './pages/profile/profile-page.component';
// import { ProfileComponent } from './components/profile/profile.component';
import { TimeLineComponent } from './components/time-line/time-line.component';
import { SettingsComponent } from './components/settings/settings.component';
import { Routes, RouterModule } from '@angular/router';
import { OverViewComponent } from './components/over-view/over-view.component';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientModalComponent } from './pages/patient-modal/patient-modal.component';
import { AtenderSeguimientoComponent } from './components/atender-seguimiento/atender-seguimiento.component';
import { UserModalComponent } from './pages/user-modal/user-modal.component';
import { PatientFormComponent } from './components/patient-form/patient-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { RoleModalComponent } from './pages/role-modal/role-modal.component';
import { SearchInviteModalComponent } from './pages/search-invite-modal/search-invite-modal.component';
import { DatosPacienteComponent } from './components/datos-paciente/datos-paciente.component';
import { DatosUsuarioComponent } from './components/datos-usuario/datos-usuario.component';

export const PROFILE_ROUTES: Routes = [
	{
		path: '', component: ProfilePageComponent,
	},
];

@NgModule({
  declarations: [ ProfilePageComponent,
    //  ProfileComponent, 
     TimeLineComponent, 
     SettingsComponent, 
     OverViewComponent, 
     PatientModalComponent, 
     AtenderSeguimientoComponent, 
     PatientFormComponent,
     UserFormComponent,
     UserModalComponent,
     RoleModalComponent,
     SearchInviteModalComponent,
     DatosPacienteComponent,
     DatosUsuarioComponent ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(PROFILE_ROUTES),
  ],
  exports:[
    PatientModalComponent,
    // ProfileComponent, 
    TimeLineComponent,  
    OverViewComponent, 
    NgbModule, 
    NgbModalModule,
    FormsModule,
    AtenderSeguimientoComponent, 
    ReactiveFormsModule,
    PatientFormComponent,
    UserFormComponent,
    UserModalComponent,
    RoleModalComponent,
    SearchInviteModalComponent,
    DatosUsuarioComponent,
    DatosPacienteComponent
  ],
  entryComponents:[
    PatientModalComponent,
    UserModalComponent,
    RoleModalComponent,
    SearchInviteModalComponent,
    
  ]
})
export class ProfileModule { }

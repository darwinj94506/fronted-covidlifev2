import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotfoundComponent } from './404/not-found.component';
import { LockComponent } from './lock/lock.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AuthenticationRoutes } from './authentication.routing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './store/auth.reducers';
import { AuthEffects } from './store/auth.effects';
import { DatosPacienteComponent } from './signup/datos-paciente.component';
import { DatosUserComponent } from './signup/datos-user.component';
// import { AuthService } from './auth.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    StoreModule.forFeature('authState', reducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [
    NotfoundComponent,
    LoginComponent,
    SignupComponent,
    LockComponent,
    DatosPacienteComponent,
    DatosUserComponent,
  ],
  providers:[
   
  ]
})
export class AuthenticationModule {}

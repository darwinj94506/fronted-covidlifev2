import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule
} from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { DataTablesModule } from 'angular-datatables';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ToastrModule } from 'ngx-toastr';
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';

import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { GraphQLModule } from './graphql.module';
// store ngrx
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { MainEffects, SeguimientoEffects, UserEffects } from './store/effects';
import { AppReducers } from './store/app.reducer';
import { NgxSpinnerModule } from "ngx-spinner";
import { UserMDBRepository,
         HospitalMDBRepository,
         SeguimientoMDBRepository,
         EstaditicasMDBRepository,
         EspacioMDBRepository } from './data/repositories/mongodb';

import { UsuarioRepository,
         EspacioRepositorio,
         HospitalRepositorio,
         SeguimientoRepositorio,
         EstadisticasRepository
         } from './core/repositories';
import { InitComponent } from './init/init.component';

import { NgxAgoraModule } from 'ngx-agora';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { AuthInterceptor } from './services/auth.interceptor';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 1,
  wheelPropagation: true,
  minScrollbarLength: 20
};          

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    FullComponent,
    BlankComponent,
    NavigationComponent,
    BreadcrumbComponent,
    SidebarComponent,
    InitComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    DataTablesModule,
    HttpClientModule,
    NgbModule,
    Ng2SearchPipeModule,
    GraphQLModule,
    AngularMultiSelectModule,
    RouterModule.forRoot(Approutes),
    PerfectScrollbarModule,
    NgxAgoraModule.forRoot({ AppID: environment.agora.appId }),
    NgMultiSelectDropDownModule.forRoot(),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyDoliAneRffQDyA7Ul9cDk3tLe7vaU4yP8' }),
    StoreModule.forRoot(AppReducers),
    EffectsModule.forRoot([MainEffects, SeguimientoEffects, UserEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: UsuarioRepository, useClass: UserMDBRepository },
    { provide: EspacioRepositorio, useClass: EspacioMDBRepository },
    { provide: HospitalRepositorio, useClass: HospitalMDBRepository },
    { provide: SeguimientoRepositorio, useClass: SeguimientoMDBRepository},
    { provide: EstadisticasRepository, useClass: EstaditicasMDBRepository},
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

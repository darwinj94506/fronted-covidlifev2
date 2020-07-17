import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule
} from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
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
import { AuthEffects } from './store/auth/auth.effects';
import { AppReducers } from './store/app.reducers';
import { NgxSpinnerModule } from "ngx-spinner";
import { UserMDBRepository } from './data/repositories/mongodb/user/user-mdb-repository';
import { FollowUpFkDBRepository,
         EspacioFkDbRepositorio,
         SeguimientoFkDBRepository} from './data/repositories/fakedb';
import { UserRepository,
         FollowUpRepository,
         EspacioRepositorio,
         SeguimientoRepositorio } from './core/repositories';





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
    SidebarComponent
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
    RouterModule.forRoot(Approutes),
    PerfectScrollbarModule,
    NgMultiSelectDropDownModule.forRoot(),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyDoliAneRffQDyA7Ul9cDk3tLe7vaU4yP8' }),
    StoreModule.forRoot(AppReducers),
    EffectsModule.forRoot([AuthEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: UserRepository, useClass: UserMDBRepository },
    { provide: EspacioRepositorio, useClass: EspacioFkDbRepositorio },
    { provide: SeguimientoRepositorio, useClass: SeguimientoFkDBRepository},
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { InitComponent } from './init/init.component';
import { LoginGuard } from './login.guard';
import { RoleGuardService } from './services';
import { RolesUserEnum } from './core/domain/enums';
import { InfoHospitalComponent } from './shared/info-hospital/info-hospital.component';
export const Approutes: Routes = [
	{
		path: '',
		canActivate:[ LoginGuard ],
		component: FullComponent,
		children: [
			{ path: '', redirectTo: '/dashboard/dashboard1', pathMatch: 'full' },
			{
				path: 'dashboard',
				loadChildren: () => import('./dashboards/dashboard.module').then(m => m.DashboardModule)
			},
			{
				path: 'starter',
				loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule)
			},
			{
				path: 'component',
				loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
			},
			{ path: 'cards', loadChildren: () => import('./cards/cards.module').then(m => m.CardsModule) },
			{ path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
			{ path: 'forms', loadChildren: () => import('./form/forms.module').then(m => m.FormModule) },
			{ path: 'tables', loadChildren: () => import('./table/tables.module').then(m => m.TablesModule) },
			{ path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartModule) },
			{
				path: 'widgets',
				loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule)
			},
			{ path: 'ecom', loadChildren: () => import('./ecommerce/ecom.module').then(m => m.EcomModule) },
			{
				path: 'timeline',
				loadChildren: () => import('./timeline/timeline.module').then(m => m.TimelineModule)
			},
			{
				path: 'extra-component',
				loadChildren:
					() => import('./extra-component/extra-component.module').then(m => m.ExtraComponentModule)
			},
			// { path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule) },
			{ path: 'apps/email', loadChildren: () => import('./apps/email/mail.module').then(m => m.MailModule) },
			{ path: 'maps', loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule) },
			{
				path: 'sample-pages',
				loadChildren: () => import('./sample-pages/sample-pages.module').then(m => m.SamplePagesModule)
			},
			// nuevos módulos
			
			{ 
				path: 'root',
				canActivate:[ RoleGuardService ],
				data: { expectedRole: RolesUserEnum.ROOT },  
				loadChildren: () => import('./modules/root-user/root-user.module').then(m => m.RootUserModule) 
			},
			{ 
				path: 'admin',
				canActivate:[ RoleGuardService ],
				data: { expectedRole: RolesUserEnum.ADMIN },  
				loadChildren: () => import('./modules/administrator/administrator.module').then(m => m.AdministratorModule) 
			},
			{
				data: { title: 'Información del hospital' } ,
				path:'informacion-general',
				component: InfoHospitalComponent
			},
			{ 
				path: 'doctor', 
				canActivate:[ RoleGuardService ],
				data: { expectedRole: RolesUserEnum.DOCTOR }, 
				loadChildren: () => import('./modules/doctor/doctor.module').then(m => m.DoctorModule) 
			},
			{ 
				path: 'paciente', 
				canActivate:[ RoleGuardService ],
				data: { expectedRole: RolesUserEnum.PACIENTE }, 
				loadChildren: () => import('./modules/patient/patient.module').then(m => m.PatientModule) 
			},
			{ 
				path: 'director', 
				canActivate:[ RoleGuardService ],
				data: { expectedRole: RolesUserEnum.DIRECTOR }, 
				loadChildren: () => import('./modules/director/director.module').then(m => m.DirectorModule) 
			},
			{ 
				path: 'perfil', 
				loadChildren: () => import('./shared/profile/profile.module').then(m => m.ProfileModule)
			}
		]
	},
	{
		path: '',
		component: BlankComponent,
		children: [
			{
				path: 'authentication',
				loadChildren:
					() => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
			},
			{   
				path: 'sala', 
				canActivate:[ LoginGuard ],
				loadChildren:
					() => import('./modules/video-chat/video-chat.module').then(m=> m.VideoChatModule)  
			},
		]
	},
	{
		path: 'inicio',
		canActivate:[ LoginGuard ],
		component: InitComponent
	},
	
	{
		path: '**',
		redirectTo: '/authentication/404'
	}
];

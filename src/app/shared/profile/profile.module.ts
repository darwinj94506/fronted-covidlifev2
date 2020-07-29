import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './profile-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TimeLineComponent } from './components/time-line/time-line.component';
import { SettingsComponent } from './components/settings/settings.component';
import { Routes, RouterModule } from '@angular/router';
import { OverViewComponent } from './components/over-view/over-view.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export const PROFILE_ROUTES: Routes = [
	{
		path: '', component: ProfilePageComponent,
	},
];

@NgModule({
  declarations: [ ProfilePageComponent, ProfileComponent, TimeLineComponent, SettingsComponent, OverViewComponent ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild(PROFILE_ROUTES),
  ]
})
export class ProfileModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartistModule } from 'ng-chartist';
import { IncomeCounterComponent } from './income-counter/income-counter.component';
import { ProjectCounterComponent } from './project-counter/project-counter.component';
import { ProjectComponent } from './project/project.component';
import { RecentcommentComponent } from './recent-comment/recent-comment.component';
import { RecentmessageComponent } from './recent-message/recent-message.component';
import { SocialSliderComponent } from './social-slider/social-slider.component';
import { TodoComponent } from './to-do/todo.component';
import { ProfileComponent } from './profile/profile.component';
import { PageAnalyzerComponent } from './page-analyzer/pa.component';
import { WidgetComponent } from './widget/widget.component';
import { CustomerSupportComponent } from './customer-support/cs.component';
import { TotalEarningComponent } from './total-earnings/te.component';
import { FeedsComponent } from './feeds/feeds.component';
import { EarningComponent } from './earning-report/earning-report.component';
import { ActivityComponent } from './activity-timeline/activity.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule({
  imports: [  
    FormsModule, 
    CommonModule, 
    NgbModule, 
    ChartsModule, 
    ChartistModule, 
    PerfectScrollbarModule
  ],
  declarations: [
 
    IncomeCounterComponent,
    ProjectCounterComponent,
    ProjectComponent,
    RecentcommentComponent,
    RecentmessageComponent,
    SocialSliderComponent,
    TodoComponent,
    ProfileComponent,
    PageAnalyzerComponent,
    WidgetComponent,
    CustomerSupportComponent,
    TotalEarningComponent,
    FeedsComponent,
    EarningComponent,
    ActivityComponent
  ],
  exports:[
    IncomeCounterComponent,
    ProjectCounterComponent,
    ProjectComponent,
    RecentcommentComponent,
    RecentmessageComponent,
    SocialSliderComponent,
    TodoComponent,
    ProfileComponent,
    PageAnalyzerComponent,
    WidgetComponent,
    CustomerSupportComponent,
    TotalEarningComponent,
    FeedsComponent,
    EarningComponent,
    ActivityComponent,
    NgbModule, 
    ChartsModule, 
    ChartistModule, 
    PerfectScrollbarModule
  ]
})
export class ItemsModule {}

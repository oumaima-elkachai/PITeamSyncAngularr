import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AdminHeaderComponent } from './shared/components/admin/admin-header/admin-header.component';
import { AdminFooterComponent } from './shared/components/admin/admin-footer/admin-footer.component';
import { AdminSidebarComponent } from './shared/components/admin/admin-sidebar/admin-sidebar.component';
import { UserHeaderComponent } from './shared/components/user/user-header/user-header.component';
import { UserFooterComponent } from './shared/components/user/user-footer/user-footer.component';
import { AdminHomeComponent } from './shared/components/admin/admin-home/admin-home.component';
import { UserHomeComponent } from './shared/components/user/user-home/user-home.component';
import { JobPostingModule } from './features/job-posting/job-posting.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { share } from 'rxjs';
import { SafeUrlPipe } from 'src/app/features/application/components/SafeUrlPipe';
import { ApplyJobComponent } from './features/application/components/apply-job/apply-job.component';
import { CandidateComponent } from './features/candidate/components/candidate/candidate.component';
import { ApplicationDetailsComponent } from './features/application/components/application-details/application-details.component';
import { JobQuizComponent } from './features/application/components/jobquiz/jobquiz.component';
import { JobStatsComponent } from './features/application/components/job-stats/job-stats.component';
import { NgChartsModule } from 'ng2-charts'; 

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    UserLayoutComponent,
    ApplyJobComponent,
    CandidateComponent,
    ApplicationDetailsComponent,
    SafeUrlPipe,
    JobQuizComponent,
    JobStatsComponent 
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    JobPostingModule,
    NgChartsModule, 
    
   
  ],
 

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

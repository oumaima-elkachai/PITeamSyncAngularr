import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { JobQuizComponent } from './features/application/components/jobquiz/jobquiz.component';
import { JobPostingsAddComponent } from './features/job-posting/components/job-postings-add/job-postings-add.component';
import { JobPostingsEditComponent } from './features/job-posting/components/job-postings-edit/job-postings-edit.component';
import { JobPostingsListComponent } from './features/job-posting/components/job-postings-list/job-postings-list.component';
import { JobPostingsDetailsComponent } from './features/job-posting/components/job-postings-details/job-postings-details.component';
import { JobPostingsUserComponent } from './features/job-posting/components/job-postings-user/job-postings-user.component';
import { JobDetailsUserComponent } from './features/job-posting/components/job-details-user/job-details-user.component';
import { ApplyJobComponent } from './features/application/components/apply-job/apply-job.component';
import { ApplicationDetailsComponent } from './features/application/components/application-details/application-details.component';
import { JobStatsComponent } from './features/application/components/job-stats/job-stats.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'job-postings', component: JobPostingsListComponent },
      { path: 'job-postings/add', component: JobPostingsAddComponent },
      { path: 'job-postings/edit/:id', component: JobPostingsEditComponent },
      { path: 'job-postings/details/:id', component: JobPostingsDetailsComponent },
      { path: 'application-details/:id', component: ApplicationDetailsComponent },
      { path: 'stat', component: JobStatsComponent },

      { path: '', redirectTo: 'job-postings', pathMatch: 'full' }
    ]
  },
  {
    path: 'user',
    component: UserLayoutComponent,
    children: [
      { path: 'job-postings', component: JobPostingsUserComponent },
      { path: 'job-postings/details/:id', component: JobDetailsUserComponent },
      { path: 'apply-job/:jobId/:candidateId', component: ApplyJobComponent },
      { path: 'job-quiz/:id', component: JobQuizComponent },
      { path: '', redirectTo: 'job-postings', pathMatch: 'full' }
    ]
  },
  {
    path: '',
    redirectTo: '/user',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

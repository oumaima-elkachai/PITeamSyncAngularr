import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { JobPostingsListComponent } from './components/job-postings-list/job-postings-list.component';
import { JobPostingsAddComponent } from './components/job-postings-add/job-postings-add.component';
import { JobPostingsEditComponent } from './components/job-postings-edit/job-postings-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { JobPostingsDetailsComponent } from './components/job-postings-details/job-postings-details.component';
import { JobPostingsUserComponent } from './components/job-postings-user/job-postings-user.component';
import { JobDetailsUserComponent } from './components/job-details-user/job-details-user.component';
@NgModule({
  declarations: [
    JobPostingsListComponent,
    JobPostingsAddComponent,
    JobPostingsEditComponent,
    JobPostingsDetailsComponent,
    JobPostingsUserComponent,
    JobDetailsUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    JobPostingsListComponent,
    JobPostingsAddComponent,
    JobPostingsEditComponent
  ]
})
export class JobPostingModule { 


}

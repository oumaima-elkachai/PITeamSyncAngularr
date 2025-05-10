import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { UserModule } from './features/User/user.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { TaskPageComponent } from './Task_Page/task-page/task-page.component';
import { TaskListComponent } from './Task_Page/task-list/task-list.component';
import { TaskCardComponent } from './Task_Page/task-card/task-card.component';
import { TaskFiltersComponent } from './Task_Page/task-filters/task-filters.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectDetailsComponent } from './project/project-details/project-details.component';
import { TaskDetailsComponent } from './task/task-details/task-details.component';
import { ProjectService } from './services/project.service';
import { TaskService } from './task.service';
import { EmployeeService } from './services/employee.service';
import { ProjectFormComponent } from './project/project-form/project-form.component';  // Add this
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskFormComponent } from './task/task-form/task-form.component';
import { ProjectEditComponent } from './project/project-edit/project-edit.component';
import { TaskEditComponent } from './task/task-edit/task-edit.component';
import { TasksComponent } from './taskfront/tasks/tasks.component';
import { MyTasksComponent } from './taskfront/my-tasks/my-tasks.component';
import { MyProjectDetailsComponent } from './taskfront/my-project-details/my-project-details.component';
import { MyTaskDetailsComponent } from './taskfront/my-task-details/my-task-details.component';
import { FileSizePipe } from './shared/pipes/filesize.pipe';
import { UpcomingDeadlinesComponent } from './employee/upcoming-deadlines/upcoming-deadlines.component';
import { TaskListingComponent } from './task/task-listing/task-listing.component';
import { AiService } from './services/ai.service';
import { AdminFooterComponent } from './shared/components/admin/admin-footer/admin-footer.component';
import { AdminHeaderComponent } from './shared/components/admin/admin-header/admin-header.component';
import { AdminHomeComponent } from './shared/components/admin/admin-home/admin-home.component';
import { AdminSidebarComponent } from './shared/components/admin/admin-sidebar/admin-sidebar.component';
import { UserFooterComponent } from './shared/components/user/user-footer/user-footer.component';
import { UserHeaderComponent } from './shared/components/user/user-header/user-header.component';
import { UserHomeComponent } from './shared/components/user/user-home/user-home.component';
import { AnomalyListComponent } from './features/anomaly-list/components/anomaly-list/anomaly-list.component';
import { JobPostingModule } from './features/job-posting/job-posting.module';
import { PaymentModule } from './features/payment/payment.module';
import { PayrollModule } from './features/payroll/payroll.module';
import { ProjectBudgetngModule } from './features/project-budget/project-budget.module';
import { PaymentChartsComponent } from './features/statistics/components/payment-charts/payment-charts.component';

import { EventsModule } from './features/events/events.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { ParticipationsModule } from './features/participation/participations.module';
import { ParticipantsModule } from './features/participants/participants.module';
import { ScheduleService } from './core/services/schedule/schedule.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';

import { RecommendationModule } from 'src/app/features/recommendation/recommendation.module';

import { RecommendationService } from 'src/app/core/services/recommendation/recommendation.service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { CombinedViewFrontModule } from './features/combined-view-front/combined-view-front.module';

      
      
     

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    UserLayoutComponent,
    TaskPageComponent,
    TaskListComponent,
    TaskCardComponent,
    TaskFiltersComponent,
    ProjectListComponent,
    ProjectDetailsComponent,
    TaskDetailsComponent,
    ProjectFormComponent,
    TaskFormComponent,
    ProjectEditComponent,
    TaskEditComponent,
    TasksComponent,
    MyTasksComponent,
    MyProjectDetailsComponent,
    MyTaskDetailsComponent,
    FileSizePipe,
    UpcomingDeadlinesComponent,
    TaskListingComponent,
    AnomalyListComponent,
    PaymentChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    UserModule, 
    SharedModule, // Import UserModule
    // Import SharedModule for shared components
    HttpClientModule,
    JobPostingModule,
    PayrollModule,
    ProjectBudgetngModule,
    PaymentModule,
    EventsModule,
    ParticipationsModule,
    ParticipantsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatSnackBarModule,
    NgApexchartsModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    CombinedViewFrontModule,
    RecommendationModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      closeButton: true, // Added close button
      enableHtml: true // Enable HTML in toast messages
    }),
    NgApexchartsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule, 
    
  ],
  providers: [ProjectService,
    TaskService,AiService,
    EmployeeService, 
    ScheduleService,
    RecommendationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
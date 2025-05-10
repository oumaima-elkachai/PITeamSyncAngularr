import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { SignupComponent } from './features/User/components/signup/signup.component';
import { LoginComponent } from './features/User/components/login/login.component';
import { AdminprofileComponent } from './features/User/components/adminprofile/adminprofile.component';
import { UserprofileComponent } from './features/User/components/userprofile/userprofile.component';
import { EditAdminProfileComponent } from './features/User/components/editadminprofile/editadminprofile.component';
import { EdituserprofileComponent } from './features/User/components/edituserprofile/edituserprofile.component';
import { AdminuserlistComponent } from './features/User/components/adminuserlist/adminuserlist.component';
import { AddadminComponent } from './features/User/components/addadmin/addadmin.component';
import { ForgetpasswordComponent } from './features/User/components/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './features/User/components/resetpassword/resetpassword.component';
import { ChatComponent } from './features/User/components/chat/chat.component';
import { TaskListingComponent } from './task/task-listing/task-listing.component';
import { MyTaskDetailsComponent } from './taskfront/my-task-details/my-task-details.component';
import { UpcomingDeadlinesComponent } from './employee/upcoming-deadlines/upcoming-deadlines.component';
import { ProjectDetailsComponent } from './project/project-details/project-details.component';
import { ProjectEditComponent } from './project/project-edit/project-edit.component';
import { ProjectFormComponent } from './project/project-form/project-form.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { TaskEditComponent } from './task/task-edit/task-edit.component';
import { TaskFormComponent } from './task/task-form/task-form.component';
import { TaskPageComponent } from './Task_Page/task-page/task-page.component';
import { MyProjectDetailsComponent } from './taskfront/my-project-details/my-project-details.component';
import { MyTasksComponent } from './taskfront/my-tasks/my-tasks.component';
import { TasksComponent } from './taskfront/tasks/tasks.component';
import { AnomalyListComponent } from './features/anomaly-list/components/anomaly-list/anomaly-list.component';
import { PaymentAddComponent } from './features/payment/components/payment-add/payment-add.component';
import { PaymentDetailComponent } from './features/payment/components/payment-detail/payment-detail.component';
import { PaymentEditComponent } from './features/payment/components/payment-edit/payment-edit.component';
import { PaymentListComponent } from './features/payment/components/payment-list/payment-list.component';
import { PayrollsAddComponent } from './features/payroll/components/payroll-add/payroll-add.component';
import { PayrollEditComponent } from './features/payroll/components/payroll-edit/payroll-edit.component';
import { PayrollListComponent } from './features/payroll/components/payroll-list/payroll-list.component';
import { ProjectBudgetsAddComponent } from './features/project-budget/components/project-budget-add/project-budget-add.component';
import { ProjectBudgetAnalyticsComponent } from './features/project-budget/components/project-budget-analytics/project-budget-analytics.component';
import { ProjectBudgetEditComponent } from './features/project-budget/components/project-budget-edit/project-budget-edit.component';
import { ProjectBudgetsListComponent } from './features/project-budget/components/project-budget-list/project-budget-list.component';
import { PaymentChartsComponent } from './features/statistics/components/payment-charts/payment-charts.component';
import { PayrollUserComponent } from './features/payroll/components/payroll-user/payroll-user.component';
import { CalendarComponent } from './features/payment/components/calendar/calendar.component';
import { CalendartestComponent } from './features/payment/components/calendartest/calendartest.component';

import { EventsAddComponent } from './features/events/components/events-add/events-add.component';
import { EventsDashboardComponent } from './features/events/components/events-dashboard/events-dashboard.component';
import { EventsListComponent } from './features/events/components/events-list/events-list.component';
import { EventsCalendarComponent } from './features/events/components/events-calendar/events-calendar.component';
import { EventsEditComponent } from './features/events/components/events-edit/events-edit.component';
//import { ParticipationComponent } from './features/participation/component/participation/participation.component';
import { ParticipationListComponent } from './features/participation/component/participation/participation-list/participation-list.component';
import { ParticipationDetailsComponent } from './features/participation/component/participation/participation-details/participation-details.component';
import { ParticipantComponent } from './features/participants/components/participant/participant.component';
import { AuditLogListComponent } from './features/events/components/audit-log-list/audit-log-list.component';
import { AuditLogDetailsComponent } from './features/events/components/audit-log-details/audit-log-details.component';
import { EventsListFrontComponent } from './features/events/components/events-list-front/events-list-front.component';

import { RecommendationsComponent } from 'src/app/features/recommendation/components/recommendation/recommendation.component';
import { CombinedViewComponent } from './features/combined-view-front/combined-view/combined-view.component';


const routes: Routes = [


  //
  { path: 'payrolls/add', component: PayrollsAddComponent },
  { path: 'payrolls', component: PayrollListComponent },
  { path: 'payrolls/edit/:id', component: PayrollEditComponent },
  { path: 'project-budget/add', component: ProjectBudgetsAddComponent },
  { path: 'project-budget', component: ProjectBudgetsListComponent },
  { path: 'project-budgets/edit/:id', component: ProjectBudgetEditComponent },
  { path: 'payments', component: PaymentListComponent },
  { path: 'payments/edit/:id', component: PaymentEditComponent },
  { path: 'payment/add', component: PaymentAddComponent },
  { path: 'payments/details/:id', component: PaymentDetailComponent },
  { path: 'anomaly', component: AnomalyListComponent },
  { path: 'paymentCharts', component: PaymentChartsComponent },
  { path: 'projectBudgetAnalytics', component: ProjectBudgetAnalyticsComponent },


  { path: 'payrolls/list', component: PayrollUserComponent },
  { path: 'payment/calendar', component: CalendarComponent },
  { path: 'testcalendar', component: CalendartestComponent },


  {
    path: 'projects/:id/tasks',
    component: TaskListingComponent
  },

  { path: 'My-tasks/:id', component: MyTaskDetailsComponent }
  ,
  { path: 'projects/:id', component: MyProjectDetailsComponent }
  ,
  {
    path: 'projects/:id/edit',
    component: ProjectEditComponent
  },
  {
    path: 'mytasks',
    component: MyTasksComponent
  },
  {
    path: 'tasks',
    component: TasksComponent
  },
  {
    path: 'projects/:projectId/tasks/:taskId/edit',
    component: TaskEditComponent
  },
  {
    path: 'projects/:projectId/new-task',
    component: TaskFormComponent
  },
  {
    path: 'upcoming-deadlines',
    component: UpcomingDeadlinesComponent,
  },
  {
    path: 'addprojects/new', component: ProjectFormComponent
  },
  {
    path: 'projects',
    component: ProjectListComponent
  },
  {
    path: 'projectsadmin/:id',
    component: ProjectDetailsComponent
  },
  {
    path: 'taskpage',
    component: TaskPageComponent
  },


  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [


      { path: 'adminprofile', component: AdminprofileComponent },
      { path: 'events', component: EventsDashboardComponent },
      { path: 'add-event', component: EventsAddComponent },
      { path: 'list-event', component: EventsListComponent },
      { path: 'calendar-event', component: EventsCalendarComponent },
      { path: 'edit-event/:idEvent', component: EventsEditComponent },
     // { path: 'participation', component: ParticipationComponent }
     
      // Participation routes
      { path: 'participations', component: ParticipationListComponent },
      { path: 'participations/:id', component: ParticipationDetailsComponent },
      { path: 'add-participation', component: ParticipationDetailsComponent },

      // Participants routes
      { path: 'participants', component: ParticipantComponent },
    ]
  },
  {
    path: 'user',
    component: UserLayoutComponent,
    children: [
      { path: 'userprofile', component: UserprofileComponent },
      { path: 'edituserprofile', component: EdituserprofileComponent },
      { path: 'askchat', component: ChatComponent },
      { path: 'events', component: EventsListFrontComponent },
      { path: 'recommendation', component: RecommendationsComponent },
      { path: 'combined-view', component: CombinedViewComponent },

    ]
  },
    { path: '', redirectTo: '/admin', pathMatch: 'full' },

  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },


  { path: 'editadminprofile', component: EditAdminProfileComponent },

  { path: 'adminuserlist', component: AdminuserlistComponent },
  { path: 'addadmin', component: AddadminComponent },
  { path: 'forgotpassword', component: ForgetpasswordComponent },
  { path: 'resetpassword', component: ResetpasswordComponent },









  { path: '', redirectTo: '/user', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

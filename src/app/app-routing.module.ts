import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { PayrollsAddComponent } from './features/payroll/components/payroll-add/payroll-add.component';
import { PayrollListComponent } from './features/payroll/components/payroll-list/payroll-list.component';
import { PayrollEditComponent } from './features/payroll/components/payroll-edit/payroll-edit.component';
import { ProjectBudgetsAddComponent } from './features/project-budget/components/project-budget-add/project-budget-add.component';
import { ProjectBudgetsListComponent } from './features/project-budget/components/project-budget-list/project-budget-list.component';
import { ProjectBudgetEditComponent } from './features/project-budget/components/project-budget-edit/project-budget-edit.component';
import { PayrollUserComponent } from './features/payroll/components/payroll-user/payroll-user.component';
import { PaymentListComponent } from './features/payment/components/payment-list/payment-list.component';
import { PaymentAddComponent } from './features/payment/components/payment-add/payment-add.component';
import { PaymentEditComponent } from './features/payment/components/payment-edit/payment-edit.component';
import { PaymentDetailComponent } from './features/payment/components/payment-detail/payment-detail.component';
import { CalendarComponent } from './features/payment/components/calendar/calendar.component';
import { AnomalyListComponent } from './features/anomaly-list/components/anomaly-list/anomaly-list.component';



/*const routes: Routes = [
  { path: 'admin',  component: AdminLayoutComponent },
  { path: 'admin/job-postings/add', component: JobPostingsAddComponent },
  { path: 'admin/job-postings/edit/:id', component: JobPostingsEditComponent },
  { path : 'admin/job-postings', component: JobPostingsListComponent},
  { path: 'admin/payrolls/add', component: PayrollsAddComponent },
  { path: 'admin/payrolls', component: PayrollListComponent },
  { path: 'admin/payrolls/edit/:id', component: PayrollEditComponent },
  { path: 'admin/project-budget/add', component: ProjectBudgetsAddComponent },
  { path: 'admin/project-budget', component: ProjectBudgetsListComponent },
  { path: 'admin/project-budgets/edit/:id', component: ProjectBudgetEditComponent },
  { path: 'admin/payments', component: PaymentListComponent  },
  { path: 'admin/payments/edit/:id', component: PaymentEditComponent },
  { path: 'admin/payment/add', component: PaymentAddComponent  },
  { path: 'admin/payments/details/:id', component: PaymentDetailComponent },
  { path: 'user',component: UserLayoutComponent},
  { path: 'user/payrolls/list', component: PayrollUserComponent },
  { path: '', redirectTo: '/user', pathMatch: 'full' }
];*/
const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'payrolls/add', component: PayrollsAddComponent },
      { path: 'payrolls', component: PayrollListComponent },
      { path: 'payrolls/edit/:id', component: PayrollEditComponent },
      { path: 'project-budget/add', component: ProjectBudgetsAddComponent },
      { path: 'project-budget', component: ProjectBudgetsListComponent },
      { path: 'project-budgets/edit/:id', component: ProjectBudgetEditComponent },
      { path: 'payments', component: PaymentListComponent  },
      { path: 'payments/edit/:id', component: PaymentEditComponent },
      { path: 'payment/add', component: PaymentAddComponent  },
      { path: 'payments/details/:id', component: PaymentDetailComponent },
      { path: 'anomaly', component: AnomalyListComponent },
      

   
    ]
  },
  {
    path: 'user',
    component: UserLayoutComponent,
    children: [
      { path: 'payrolls/list', component: PayrollUserComponent },
      { path: 'payment/calendar', component: CalendarComponent },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

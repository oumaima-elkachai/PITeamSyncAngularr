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
import { PayrollModule } from './features/payroll/payroll.module';
import { ProjectBudgetngModule } from './features/project-budget/project-budget.module';
import { PaymentListComponent } from './features/payment/components/payment-list/payment-list.component';
import { PaymentAddComponent } from './features/payment/components/payment-add/payment-add.component';
import { PaymentModule } from './features/payment/payment.module';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    UserLayoutComponent,



   
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
    PayrollModule,
    ProjectBudgetngModule,
    PaymentModule 
   
  ],
 

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

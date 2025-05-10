import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { PayrollListComponent } from 'src/app/features/payroll/components/payroll-list/payroll-list.component';
import { PayrollsAddComponent } from './components/payroll-add/payroll-add.component';
import { PayrollEditComponent } from 'src/app/features/payroll/components/payroll-edit/payroll-edit.component';
import { PayrollUserComponent } from './components/payroll-user/payroll-user.component';
@NgModule({
  declarations: [
    PayrollListComponent,
    PayrollsAddComponent,
    PayrollEditComponent,
    PayrollUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
   PayrollListComponent,
   PayrollsAddComponent,
   PayrollEditComponent
  ]
})
export class PayrollModule { 


}

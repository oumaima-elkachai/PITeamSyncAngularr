import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectBudgetsAddComponent } from 'src/app/features/project-budget/components/project-budget-add/project-budget-add.component';
import { ProjectBudgetEditComponent } from 'src/app/features/project-budget/components/project-budget-edit/project-budget-edit.component';
import { ProjectBudgetsListComponent } from 'src/app/features/project-budget/components/project-budget-list/project-budget-list.component';
import { ProjectBudgetDeleteComponent } from './components/project-budget-delete/project-budget-delete.component';

@NgModule({
  declarations: [
    ProjectBudgetsListComponent,
    ProjectBudgetsAddComponent,
    ProjectBudgetEditComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
   ProjectBudgetsAddComponent,
   ProjectBudgetEditComponent,
   ProjectBudgetsListComponent
  ]
})
export class ProjectBudgetngModule { 


}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { TaskPageComponent } from './Task_Page/task-page/task-page.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectDetailsComponent } from './project/project-details/project-details.component';
import { ProjectFormComponent } from './project/project-form/project-form.component';
import { TaskFormComponent } from './task/task-form/task-form.component';
import { ProjectEditComponent } from './project/project-edit/project-edit.component';
import { TaskEditComponent } from './task/task-edit/task-edit.component';

const routes: Routes = [

  { 
    path: 'projects/:id/edit', 
    component: ProjectEditComponent 
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
    path: 'projects/new', component: ProjectFormComponent 
  },
  { 
    path: 'projects',
    component: ProjectListComponent 
  },
  { 
    path: 'projects/:id',
    component: ProjectDetailsComponent 
  },

  {
    path: 'admin',
    component: AdminLayoutComponent
  },
  {
    path: 'user',
    component: UserLayoutComponent
  },
  {
    path: 'taskpage',
    component: TaskPageComponent
  },
  { path: '', redirectTo: '/user', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

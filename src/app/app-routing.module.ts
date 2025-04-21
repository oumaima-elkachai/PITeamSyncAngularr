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
import { TasksComponent } from './taskfront/tasks/tasks.component';
import { MyTasksComponent } from './taskfront/my-tasks/my-tasks.component';
import { MyProjectDetailsComponent } from './taskfront/my-project-details/my-project-details.component';
import { MyTaskDetailsComponent } from './taskfront/my-task-details/my-task-details.component';

const routes: Routes = [

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

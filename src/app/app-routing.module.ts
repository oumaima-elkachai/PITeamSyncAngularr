import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { TaskPageComponent } from './Task_Page/task-page/task-page.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectDetailsComponent } from './project/project-details/project-details.component';

const routes: Routes = [

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

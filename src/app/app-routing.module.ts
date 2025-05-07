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

const routes: Routes = [

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


  { path: 'admin',
    component: AdminLayoutComponent, 
  children: [


    { path: 'adminprofile', component: AdminprofileComponent },
  ]},
  { path: 'user',
    component: UserLayoutComponent,
    children : [
      { path: 'userprofile', component: UserprofileComponent },
      { path: 'edituserprofile', component: EdituserprofileComponent },
      { path: 'askchat', component: ChatComponent },
    ]
  },
  { path: 'signup',
    component: SignupComponent
  },
  { path: 'login',
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

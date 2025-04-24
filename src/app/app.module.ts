import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { HttpClientModule } from '@angular/common/http';
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


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    UserLayoutComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    AdminSidebarComponent,
    UserHeaderComponent,
    UserFooterComponent,
    AdminHomeComponent,
    UserHomeComponent,
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
    UpcomingDeadlinesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,  // Add this line
    AppRoutingModule
  ],
  providers: [ProjectService,
    TaskService,
    EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

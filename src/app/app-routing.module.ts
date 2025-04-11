import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { TaskPageComponent } from './Task_Page/task-page/task-page.component';

const routes: Routes = [
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

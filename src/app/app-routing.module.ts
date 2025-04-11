import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { PresenceListComponent } from './features/components/Presence/presence-list/presence-list.component';
import { PresenceFormComponent } from './features/components/Presence/presence-form/presence-form.component';
import { AddPresenceComponent } from './features/components/user/add-presence/add-presence.component';
import { RequestformComponent } from './features/components/user/request/requestform/requestform.component';
import { MyrequestsComponent } from './features/components/user/request/myrequests/myrequests.component';
import { RequestadminComponent } from './features/components/request/requestadmin/requestadmin.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'presence', component: PresenceListComponent },
      { path: 'admin/presence/add', component: PresenceFormComponent },
      { path: 'attendances/edit/:id', component: PresenceFormComponent },
      { path: 'requests', component: RequestadminComponent}
   
    ]
  },
  {
    path: 'user',
    component: UserLayoutComponent,
    children: [
      { path: 'attendance', component: AddPresenceComponent },
      { path: 'leave-request', component: RequestformComponent },
      { path: 'myrequests', component:MyrequestsComponent},
      { path: 'edit-request/:id', component: MyrequestsComponent },
      { path: 'myrequests/:employeeId', component: MyrequestsComponent }, // Updated route

    ]
  },
  { path: '', redirectTo: '/admin', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

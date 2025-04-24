import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { EventsAddComponent } from './features/events/components/events-add/events-add.component';
import { EventsDashboardComponent } from './features/events/components/events-dashboard/events-dashboard.component';
import { EventsListComponent } from './features/events/components/events-list/events-list.component';
import { EventsCalendarComponent } from './features/events/components/events-calendar/events-calendar.component';
import { EventsEditComponent } from './features/events/components/events-edit/events-edit.component';
//import { ParticipationComponent } from './features/participation/component/participation/participation.component';
import { ParticipationListComponent } from './features/participation/component/participation/participation-list/participation-list.component';
import { ParticipationDetailsComponent } from './features/participation/component/participation/participation-details/participation-details.component';
import { ParticipantComponent } from './features/participants/components/participant/participant.component';
import { AuditLogListComponent } from './features/events/components/audit-log-list/audit-log-list.component';
import { AuditLogDetailsComponent } from './features/events/components/audit-log-details/audit-log-details.component';


const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [

      { path: 'events', component: EventsDashboardComponent },
      { path: 'add-event', component: EventsAddComponent },
      { path: 'list-event', component: EventsListComponent },
      { path: 'calendar-event', component: EventsCalendarComponent },
      { path: 'edit-event/:idEvent', component: EventsEditComponent },
     // { path: 'participation', component: ParticipationComponent }
     
      // Participation routes
      { path: 'participations', component: ParticipationListComponent },
      { path: 'participations/:id', component: ParticipationDetailsComponent },
      { path: 'add-participation', component: ParticipationDetailsComponent },

      // Participants routes
      { path: 'participants', component: ParticipantComponent },
      //{ path: 'participants/:id', component: ParticipantDetailsComponent },
      //{ path: 'add-participant', component: ParticipantDetailsComponent },

      // Audit logs routes
     // { path: 'audit-logs', component: AuditLogListComponent },
    //  { path: 'audit-logs/:id', component: AuditLogDetailsComponent },


    ]
  },

  {
    path: 'user',
    component: UserLayoutComponent,
    children: [

    ]
  },
  { path: '', redirectTo: '/admin', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

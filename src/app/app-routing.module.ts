import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { EventsAddComponent } from './features/events/components/events-add/events-add.component';
import { EventsDashboardComponent } from './features/events/components/events-dashboard/events-dashboard.component';
import { EventsListComponent } from './features/events/components/events-list/events-list.component';
import { EventsCalendarComponent } from './features/events/components/events-calendar/events-calendar.component';
import { EventsEditComponent } from './features/events/components/events-edit/events-edit.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [

      { path: 'events', component: EventsDashboardComponent },
      { path: 'add-event', component: EventsAddComponent },
      { path: 'list-event', component: EventsListComponent },
      { path: 'calendar-event', component: EventsCalendarComponent },
      { path: 'edit-event/:idEvent', component: EventsEditComponent }

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

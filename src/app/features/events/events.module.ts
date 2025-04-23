import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsDashboardComponent } from './components/events-dashboard/events-dashboard.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { EventsCalendarComponent } from './components/events-calendar/events-calendar.component';
import { EventsAddComponent } from './components/events-add/events-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EventsEditComponent } from './components/events-edit/events-edit.component';
import { ToastrModule } from "ngx-toastr";
import { UpcomingEventsComponent } from './components/upcoming-events/upcoming-events.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const routes: Routes = [
  {
    path: 'events',
    children: [
      { path: '', component: EventsDashboardComponent },
      { path: 'add', component: EventsAddComponent },
      { path: 'edit/:id', component: EventsEditComponent },
      { path: 'view/:id', component: EventsCalendarComponent },
      { path: 'list', component: EventsListComponent }
    ]
  }
];

@NgModule({
  declarations: [
    EventsDashboardComponent,
    EventsListComponent,
    EventsCalendarComponent,
    EventsAddComponent,
    EventsEditComponent,
    UpcomingEventsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FullCalendarModule,
    MatProgressSpinnerModule,
    ToastrModule
  ],
  providers: [
    {
      provide: 'SOCKET_CONFIG',
      useValue: {
        url: 'http://localhost:8080/ws',
        options: {
          reconnectDelay: 5000,
          heartbeatIncoming: 4000,
          heartbeatOutgoing: 4000
        }
      }
    }
  ],
})
export class EventsModule { }

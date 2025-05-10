import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
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
import { AuditLogListComponent } from './components/audit-log-list/audit-log-list.component';
import { ImageModalComponent } from 'src/app/features/events/components/image-modal/image-modal.component';
<<<<<<< Updated upstream
import { EventsListFrontComponent } from 'src/app/features/events/components/events-list-front/events-list-front.component';
=======
import { EventsListFrontComponent } from './components/events-list-front/events-list-front.component';
>>>>>>> Stashed changes



const routes: Routes = [
  {
    path: 'events',
    children: [
      { path: '', component: EventsDashboardComponent },
      { path: 'add', component: EventsAddComponent },
      { path: 'edit/:id', component: EventsEditComponent },
      { path: 'view/:id', component: EventsCalendarComponent },
      { path: 'list', component: EventsListComponent },
      { path: 'audit', component: AuditLogListComponent }
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
    AuditLogListComponent,
    ImageModalComponent,
    EventsListFrontComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
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
  exports: [
    EventsDashboardComponent,
    EventsListComponent,
    EventsCalendarComponent,
    EventsAddComponent,
    EventsEditComponent,
    UpcomingEventsComponent,
<<<<<<< Updated upstream
    AuditLogListComponent
=======
    AuditLogListComponent,
    EventsListFrontComponent
>>>>>>> Stashed changes
  ]
})
export class EventsModule { }

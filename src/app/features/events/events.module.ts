import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsDashboardComponent } from './components/events-dashboard/events-dashboard.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { EventsCalendarComponent } from './components/events-calendar/events-calendar.component';
import { EventsAddComponent } from './components/events-add/events-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EventsEditComponent } from './components/events-edit/events-edit.component';
//import { EventNotificationComponent } from './components/event-notification/event-notification.component';
import { WebSocketService } from 'src/app/core/services/websocket/websocket.service';
import {ToastrModule} from "ngx-toastr";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpcomingEventsComponent } from './components/upcoming-events/upcoming-events.component';
//import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    EventsDashboardComponent,
    EventsListComponent,
    EventsCalendarComponent,
    EventsAddComponent,
    EventsEditComponent,
    //EventNotificationComponent,
    UpcomingEventsComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    FullCalendarModule,
   // MatDialogModule,
    ToastrModule.forRoot({
      progressBar: true,
      closeButton: true,
      newestOnTop: true,
      tapToDismiss: true,
      positionClass: 'toast-bottom-right',
      timeOut: 8000
    })
  ],
  /*exports: [
    EventsListComponent
  ],*/
  providers: [WebSocketService],


})
export class EventsModule {}

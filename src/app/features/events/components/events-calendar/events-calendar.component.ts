// events-calendar.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../../models/event.model';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import { DateClickArg } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-events-calendar',
  templateUrl: './events-calendar.component.html',
  styleUrls: ['./events-calendar.component.css']
})
export class EventsCalendarComponent implements OnInit {
  @Input() events: Event[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: this.formatEvents(),
    eventClick: this.handleEventClick.bind(this),
    dateClick: this.handleDateClick.bind(this)
  };

  ngOnInit(): void {
    this.updateCalendar();
  }

  ngOnChanges(): void {
    this.updateCalendar();
  }

  private formatEvents(): any[] {
    return this.events.map(event => ({
      id: event.idEvent,
      title: event.title,
      start: `${event.startDate}T${event.startTime}:00`,
      end: `${event.endDate}T${event.endTime}:00`,
      description: event.description,
      status: event.typeS,
      extendedProps: {
        description: event.description,
        status: event.typeS,
        participants: event.participantIds
      }
    }));
  }

  private updateCalendar(): void {
    this.calendarOptions.events = this.formatEvents();
  }

  private handleEventClick(clickInfo: EventClickArg): void {
    console.log('Event clicked:', clickInfo.event);
    // You can add more interaction logic here
  }

  private handleDateClick(clickInfo: DateClickArg): void {
    console.log('Date clicked:', clickInfo.date);
    // You can add date click logic here
  }
}

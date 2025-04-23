// events-calendar.component.ts
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Event } from '../../models/event.model';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import { DateClickArg } from '@fullcalendar/interaction';
import { EventService } from '../../../../core/services/events/events.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-events-calendar',
  templateUrl: './events-calendar.component.html',
  styleUrls: ['./events-calendar.component.css']
})
export class EventsCalendarComponent implements OnInit {
  @Input() numberOfDays: number = 30;
  @Input() events: Event[] = [];
  @Input() initialView: string = 'dayGridMonth';
  @Input() headerToolbar: any = {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  };
  @Input() timeZone: string = 'local';
  @Input() eventTimeFormat: any = {
    hour: '2-digit',
    minute: '2-digit',
    meridiem: false,
    hour12: false
  };
  @Input() eventDisplay: string = 'block';
  @Input() displayEventEnd: boolean = true;
  @Input() statusColors: { [key: string]: string } = {
    scheduled: '#4CAF50',
    cancelled: '#F44336',
    postponed: '#FFA726',
    default: '#2196F3'
  };

  @Output() eventClicked = new EventEmitter<Event>();
  @Output() dateClicked = new EventEmitter<Date>();

  loading = false;
  error: string | null = null;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: [],
    datesSet: (dateInfo) => {
      this.fetchEvents(dateInfo.start, dateInfo.end);
    },
    eventClick: this.handleEventClick.bind(this),
    dateClick: this.handleDateClick.bind(this),
    eventDidMount: (info) => {
      this.setEventColor(info);
    }
  };

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    const today = new Date();
    const end = new Date();
    end.setDate(today.getDate() + this.numberOfDays);
    this.fetchEvents(today, end);
  }

  private fetchEvents(start: Date, end: Date): void {
    this.loading = true;
    this.error = null;

    this.eventService.getEventsInRange(start, end).subscribe({
      next: (events) => {
      
        this.calendarOptions.events = this.formatEvents(events);
        console.log('Formatted events:', this.calendarOptions.events);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching events:', error);
        this.error = 'Failed to load events';
        this.loading = false;
      }
    });
  }

  private setEventColor(info: any): void {
    const status = info.event.extendedProps.status?.toLowerCase();
    info.el.style.backgroundColor = this.statusColors[status] || this.statusColors['default'];
  }

  private formatEvents(events: Event[]): any[] {
    return events.map(event => ({
      id: event.idEvent,
      title: event.title,
      start: new Date(`${event.startDate}T${event.startTime}`),
      end: new Date(`${event.endDate}T${event.endTime}`),
      description: event.description,
      status: event.typeS,
      extendedProps: {
        description: event.description,
        status: event.typeS,
        participants: event.participantIds
      },
      allDay: this.isAllDayEvent(event)
    }));
  }

  private isAllDayEvent(event: Event): boolean {
    return event.startTime === '00:00' && event.endTime === '23:59';
  }

  private handleEventClick(clickInfo: EventClickArg): void {
    const eventId = clickInfo.event.id;
    const originalEvent = this.events.find(e => e.idEvent === eventId);
    if (originalEvent) {
      this.eventClicked.emit(originalEvent);
    }
  }

  private handleDateClick(clickInfo: DateClickArg): void {
    this.dateClicked.emit(clickInfo.date);
  }
}

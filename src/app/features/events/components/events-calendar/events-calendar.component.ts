// events-calendar.component.ts
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Event } from '../../models/event.model';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import { DateClickArg } from '@fullcalendar/interaction';
import { EventService } from '../../../../core/services/events/events.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getEventColor } from '../../utils/event-color.util';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ScheduleService } from '../../../../core/services/schedule/schedule.service';

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
  @Input() enableDateSelection = true;
  @Output() eventClicked = new EventEmitter<Event>();
  @Output() dateClicked = new EventEmitter<Date>();
  @Output() addEventRequested = new EventEmitter<Date>();

  loading = false;
  error: string | null = null;
  showAddEventModal = false;
  selectedDate: Date | null = null;
  showEventDetailsModal = false;
  selectedEvent: any = null;

  private currentViewDates: { start: Date, end: Date } | null = null;

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
      this.currentViewDates = {
        start: dateInfo.start,
        end: dateInfo.end
      };
      this.fetchEvents(dateInfo.start, dateInfo.end);
    },
    eventClick: this.handleEventClick.bind(this),
    dateClick: this.handleDateClick.bind(this),
    eventDidMount: (info) => {
      this.setEventColor(info);
    },
    eventContent: (arg: any) => {
      const event = arg.event;
      const color = getEventColor(event.extendedProps.typeS);
      
      return {
        html: `
          <div class="fc-content" style="background-color: ${color}; border-color: ${color}">
            <div class="fc-title">${event.title}</div>
          </div>
        `
      };
    },
    selectable: true // Enable date selection
  };

  constructor(
    private eventService: EventService,
    private snackBar: MatSnackBar,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit(): void {
    const today = new Date();
    const end = new Date();
    end.setDate(today.getDate() + this.numberOfDays);
    this.fetchEvents(today, end);

    // Subscribe to refresh events
    this.scheduleService.refreshCalendar$.subscribe(() => {
      this.refreshCalendar();
    });
  }

  private refreshCalendar(): void {
    if (this.currentViewDates) {
      this.fetchEvents(this.currentViewDates.start, this.currentViewDates.end);
    } else {
      const today = new Date();
      const end = new Date();
      end.setDate(today.getDate() + this.numberOfDays);
      this.fetchEvents(today, end);
    }
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
    return events.map(event => {
      const formattedEvent = {
        id: event.idEvent,
        title: event.title,
        start: new Date(`${event.startDate}T${event.startTime}`),
        end: new Date(`${event.endDate}T${event.endTime}`),
        description: event.description,
        status: event.typeS,
        extendedProps: {
          description: event.description,
          status: event.typeS,
          participants: event.participantIds,
          typeS: event.typeS
        },
        allDay: this.isAllDayEvent(event)
      };

      return formattedEvent; // Remove the completion check since it's handled by ScheduleService
    });
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
    this.selectedEvent = clickInfo.event;
    this.showEventDetailsModal = true;
  }

  private handleDateClick(clickInfo: DateClickArg): void {
    if (!this.enableDateSelection) return;
    
    // Get the clicked date and format it to yyyy-mm-dd
    const year = clickInfo.date.getFullYear();
    const month = String(clickInfo.date.getMonth() + 1).padStart(2, '0');
    const day = String(clickInfo.date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    
    // Create a new Date object at midnight for the selected date
    const clickedDate = new Date(formattedDate + 'T00:00:00');
    
    this.selectedDate = clickedDate;
    this.showAddEventModal = true;
    this.addEventRequested.emit(clickedDate);
    this.dateClicked.emit(clickedDate);
  }

  closeAddEventModal(): void {
    this.showAddEventModal = false;
    this.selectedDate = null;
  }

  closeEventDetailsModal(): void {
    this.showEventDetailsModal = false;
    this.selectedEvent = null;
  }

  participateInEvent(): void {
    // TODO: Implement participation logic here
    console.log('User wants to participate in event:', this.selectedEvent);
    // You can call your service method here to handle participation
    this.closeEventDetailsModal();
  }
}

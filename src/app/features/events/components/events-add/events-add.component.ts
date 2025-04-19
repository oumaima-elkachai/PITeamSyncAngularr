import { Component, EventEmitter, Output } from '@angular/core';
import { EventService } from "../../../../core/services/events/events.service";
import { EventStatus } from "../../models/event-status.enum";
import { Event } from "../../models/event.model";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { format } from 'date-fns';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events-add',
  templateUrl: './events-add.component.html',
  styleUrls: ['./events-add.component.css']
})
export class EventsAddComponent {
  @Output() eventAdded = new EventEmitter<Event>();
  @Output() cancel = new EventEmitter<void>();

  eventData: Partial<Event> = {
    startDate: format(new Date(), 'yyyy-MM-dd'),
    endDate: format(new Date(), 'yyyy-MM-dd'),
    startTime: '00:00',
    endTime: '00:00',
    title: '',
    description: '',
    typeS: EventStatus.PLANNED,
    reminderSent: false,
    participantIds: [],
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };

  eventStatuses = Object.values(EventStatus);

  constructor(
      private http: HttpClient,
      private eventService: EventService,
      private router: Router
  ) {}

  submitForm(): void {
    if (!this.eventData.title || !this.eventData.startDate) {
      console.error('❌ Title and start date are required');
      return;
    }

    const now = new Date();
    const eventDateTime = new Date(`${this.eventData.startDate}T${this.eventData.startTime || '00:00'}`);

    const formattedEvent = {
      ...this.eventData,
      startDate: this.eventData.startDate,
      endDate: this.eventData.endDate || this.eventData.startDate
    } as Event;

    this.eventService.addEvent(formattedEvent).subscribe({
      next: (createdEvent: Event) => {
        console.log('✅ Event created successfully:', createdEvent);
        this.eventAdded.emit(createdEvent);
        this.resetForm();
      },
      error: (err: HttpErrorResponse) => {
        console.error('❌ Error creating event:', err);
        if (err.error) {
          console.error('Server response:', err.error);
        }
      }
    });
  }

  returnToList(): void {
    this.router.navigate(['admin/events/']);
  }

  private resetForm(): void {
    this.eventData = {
      startDate: format(new Date(), 'yyyy-MM-dd'),
      endDate: format(new Date(), 'yyyy-MM-dd'),
      startTime: '00:00',
      endTime: '00:00',
      title: '',
      description: '',
      typeS: EventStatus.PLANNED,
      reminderSent: false,
      participantIds: [],
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
  }
}

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
    this.eventService.addEvent(this.eventData as Event).subscribe({
      next: (newEvent: Event) => {
        this.eventAdded.emit(newEvent);
      },
      error: (error) => {
        console.error('Error adding event:', error);
      }
    });
  }

  returnToList(): void {
    this.cancel.emit();
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

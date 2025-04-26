import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../core/services/events/events.service';
import { EventStatus } from 'src/app/features/events/models/event-status.enum';

@Component({
  selector: 'app-events-list-front',
  templateUrl: './events-list-front.component.html',
  styleUrls: ['./events-list-front.component.css']
})
export class EventsListFrontComponent implements OnInit {
  events: any[] = [];
  loading = false;
  error: string | null = null;
  selectedEvent: any = null;
  showModal = false;
  isSubmitting = false;
  EventStatus = EventStatus;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  private loadEvents(): void {
    this.loading = true;
    this.eventService.getAllEvents().subscribe({
      next: (events) => {
        this.events = events;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load events';
        this.loading = false;
      }
    });
  }

  filterEvents(type: string) {
    switch(type) {
      case 'upcoming':
        this.events = this.events.filter(event => new Date(event.startDate) > new Date());
        break;
      case 'past':
        this.events = this.events.filter(event => new Date(event.startDate) < new Date());
        break;
      default:
        this.loadEvents();
    }
  }

  openEventDetails(event: any): void {
    this.selectedEvent = event;
    this.showModal = true;
    document.body.classList.add('modal-open');
  }

  closeModal(): void {
    this.selectedEvent = null;
    this.showModal = false;
    document.body.classList.remove('modal-open');
  }

  participateInEvent(): void {
    if (!this.selectedEvent) return;

    if (this.eventService.isEventFull(this.selectedEvent)) {
      window.alert('Sorry, this event is already full!');
      return;
    }

    this.isSubmitting = true;
    
    this.eventService.createParticipation(this.selectedEvent.idEvent)
      .subscribe({
        next: (response) => {
          window.alert('Successfully registered for the event!');
          if (this.selectedEvent && !this.selectedEvent.participantIds) {
            this.selectedEvent.participantIds = [];
          }
          if (this.selectedEvent && response.userId) {
            this.selectedEvent.participantIds.push(response.userId);
          }
          this.closeModal();
        },
        error: (error) => {
          console.error('Error creating participation:', error);
          window.alert('Failed to register for the event. Please try again.');
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
  }
}

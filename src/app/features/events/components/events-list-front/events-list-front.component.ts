import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../core/services/events/events.service';
import { Event } from '../../models/event.model';
import { EventStatus } from '../../models/event-status.enum';

@Component({
  selector: 'app-events-list-front',
  templateUrl: './events-list-front.component.html',
  styleUrls: ['./events-list-front.component.css']
})
export class EventsListFrontComponent implements OnInit {
  events: Event[] = [];
  loading = false;
  error: string | null = null;

  // Make EventStatus enum available to template
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

  isUpcoming(event: Event): boolean {
    return new Date(event.startDate) > new Date();
  }

  timeSince(date: string): string {
    const now = new Date();
    const eventDate = new Date(date);
    const seconds = Math.floor((now.getTime() - eventDate.getTime()) / 1000);

    if (seconds < 0) {
      return 'Coming soon';
    }

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval > 1) {
        return `${interval} ${unit}s ago`;
      } else if (interval === 1) {
        return `1 ${unit} ago`;
      }
    }

    return 'Just now';
  }
}

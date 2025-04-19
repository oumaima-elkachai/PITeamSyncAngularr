// upcoming-events.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../../models/event.model';
import { EventService } from '../../../../core/services/events/events.service';

@Component({
  selector: 'app-upcoming-events',
  template: `
    <div class="upcoming-events-container">
      <h2>Upcoming Events</h2>
      <div *ngIf="isLoading" class="loading">Loading...</div>
      <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>
      <div class="events-grid" *ngIf="!isLoading && !errorMessage">
        <div *ngFor="let event of upcomingEvents" class="event-card">
          <div class="event-date">
            {{ event.startDate | date:'MMM dd' }}
          </div>
          <div class="event-details">
            <h3>{{ event.title }}</h3>
            <p>{{ event.description }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .upcoming-events-container {
      padding: 1rem;
    }

    .events-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    .event-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      overflow: hidden;
      transition: transform 0.2s;
    }

    .event-card:hover {
      transform: translateY(-2px);
    }

    .event-date {
      background: #1976d2;
      color: white;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-width: 80px;
    }

    .event-details {
      padding: 1rem;
      flex: 1;
    }

    .event-details h3 {
      margin: 0 0 0.5rem 0;
      color: #333;
    }

    .event-location {
      margin-top: 0.5rem;
      color: #666;
      font-size: 0.9em;
    }

    .event-location i {
      margin-right: 0.5rem;
    }

    .loading {
      text-align: center;
      color: #1976d2;
    }

    .error {
      text-align: center;
      color: red;
    }
  `]
})
export class UpcomingEventsComponent implements OnInit {
  upcomingEvents: Event[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadUpcomingEvents();
  }

  loadUpcomingEvents(): void {
    this.isLoading = true;
    this.eventService.getAllEvents().subscribe({
      next: (data: any) => {
        const today = new Date();
        this.upcomingEvents = Array.isArray(data.data) 
          ? (data.data as Event[])
            .filter((event: Event) => new Date(event.startDate) >= today)
            .sort((a: Event, b: Event) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
            .slice(0, 4)
          : [];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading upcoming events:', error);
        this.errorMessage = 'Failed to load upcoming events';
        this.isLoading = false;
      }
    });
  }
}

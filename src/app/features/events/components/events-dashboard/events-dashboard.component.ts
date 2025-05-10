import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event.model';
import { HttpErrorResponse } from '@angular/common/http';
import { EventService } from '../../../../core/services/events/events.service';
@Component({
  selector: 'app-events-dashboard',
  templateUrl: './events-dashboard.component.html',
  styleUrls: ['./events-dashboard.component.css']
})
export class EventsDashboardComponent implements OnInit{

  constructor(private eventService: EventService) {}

  today = new Date();
  upcomingEvents: Event[] = [];
  events: Event[] = [];
  selectedEvent: Event | null = null;
  showAddEventModal = false;
  showEditEventModal = false;

  // Add new properties
  isLoading = false;
  viewMode: 'list' | 'calendar' | 'audit' = 'list';
  searchTerm = '';

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.isLoading = true;
    this.eventService.getAllEvents().subscribe({
      next: (data: any) => {
        this.events = Array.isArray(data.data) ? data.data : [];
        this.filterUpcomingEvents();
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      }
    });
  }

  filterUpcomingEvents(): void {
    const today = new Date();
    this.upcomingEvents = this.events.filter(event =>
        new Date(event.startDate) >= today
    ).slice(0, 4); // Show only 4 upcoming events
  }

  searchEvents(term: string): void {
    this.searchTerm = term;
    if (!term) {
      this.loadEvents();
      return;
    }
    this.events = this.events.filter(event => 
      event.title.toLowerCase().includes(term.toLowerCase()) ||
      event.description.toLowerCase().includes(term.toLowerCase())
    );
  }

  toggleView(mode: 'list' | 'calendar' | 'audit'): void {
    this.viewMode = mode;
  }

  // Modal control methods
  openAddEventModal(): void {
    this.showAddEventModal = true;
  }

  closeAddEventModal(): void {
    this.showAddEventModal = false;
  }

  closeEditEventModal(): void {
    this.showEditEventModal = false;
    this.selectedEvent = null;
  }

  // Event handlers
  handleEventAdded(newEvent: Event): void {
    this.events = [...this.events, newEvent];
    this.closeAddEventModal();
  }

  handleEventUpdated(updatedEvent: Event): void {
    const index = this.events.findIndex(e => e.idEvent === updatedEvent.idEvent);
    if (index !== -1) {
      this.events[index] = updatedEvent;
      this.events = [...this.events]; // Create new reference
    }
    this.closeEditEventModal();
  }

  handleEventDeletion(eventId: string): void {
    this.events = this.events.filter(e => e.idEvent !== eventId);
  }

  loadEventForEdit(eventId: string): void {
    const event = this.events.find(e => e.idEvent === eventId);
    if (event) {
      this.selectedEvent = { ...event };
      this.showEditEventModal = true;
    }
  }
}

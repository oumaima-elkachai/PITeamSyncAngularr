import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { EventService } from 'src/app/core/services/events/events.service';
import { Event } from 'src/app/features/events/models/event.model';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";

/*
@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  events: Event[] = [];  // Array to hold the events fetched from the service
  isLoading: boolean = true;  // Flag to show loading state
  errorMessage: string = '';  // Error message to display in case of failure

  constructor(private eventService: EventService, private http: HttpClient, private router: Router)  {}

  ngOnInit(): void {
    this.fetchEvents();  // Fetch the events when the component is initialized
  }

  fetchEvents(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.eventService.getAllEvents().subscribe({
      next: (data: any) => {
        console.log('Fetched events:', data);  // logs { data: [...], status: "success" }
        this.events = Array.isArray(data.data) ? data.data : [];  // extract actual list
        console.log('Events set:', this.events);
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching events:', error);
        this.isLoading = false;
        this.errorMessage = 'Failed to load events. Please try again later.';
      }
    });
  }


  removeEvent(id: string): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(id).subscribe({
        next: () => {
          // Remove the deleted event from the local list
          this.events = this.events.filter(event => event.idEvent !== id);
          console.log(`Event ${id} deleted`);
        },
        error: (error) => {
          console.error('Error deleting event:', error);
          alert('An error occurred while deleting the event.');
        }
      });
    }
  }

}*/

@Component({
    selector: 'app-events-list',
    templateUrl: './events-list.component.html',
    styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
    @Input() events: Event[] = [];
    isLoading: boolean = true;
    errorMessage: string = '';

    // Add these Outputs to communicate with parent
    @Output() editEvent = new EventEmitter<string>();
    @Output() deleteEvent = new EventEmitter<string>();

    constructor(
        private eventService: EventService,
        private http: HttpClient,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.fetchEvents();
    }

    fetchEvents(): void {
        this.isLoading = true;
        this.errorMessage = '';

        this.eventService.getAllEvents().subscribe({
            next: (data: any) => {
                this.events = Array.isArray(data.data) ? data.data : [];
                this.isLoading = false;
            },
            error: (error: HttpErrorResponse) => {
                console.error('Error fetching events:', error);
                this.isLoading = false;
                this.errorMessage = 'Failed to load events. Please try again later.';
            }
        });
    }

    removeEvent(id: string): void {
        if (confirm('Are you sure you want to delete this event?')) {
            this.eventService.deleteEvent(id).subscribe({
                next: () => {
                    // Remove the deleted event from the local array
                    this.events = this.events.filter(event => event.idEvent !== id);

                    // Optional: Show success message
                    console.log('Event deleted successfully');
                },
                error: (error) => {
                    console.error('Error deleting event:', error);
                    // Optional: Show error message to user
                    alert('Failed to delete event. Please try again.');
                }
            });
        }
    }



    onEdit(eventId: string): void {
        this.editEvent.emit(eventId);
    }


}


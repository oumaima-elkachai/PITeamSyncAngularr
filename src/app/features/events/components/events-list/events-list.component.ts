import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { EventService } from 'src/app/core/services/events/events.service';
import { Event } from 'src/app/features/events/models/event.model';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";


@Component({
    selector: 'app-events-list',
    templateUrl: './events-list.component.html',
    styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
    @Input() events: Event[] = [];
    isLoading: boolean = true;
    errorMessage: string = '';
    pageSize: number = 10;
    currentPage: number = 1;
    sortField: string = 'startDate';
    sortDirection: 'asc' | 'desc' = 'asc';

    showEditModal = false;
    showAddModal = false;
    showViewModal = false;
    selectedEvent: Event | null = null;
    viewingEvent: Event | null = null;

    // Add these Outputs to communicate with parent
    @Output() editEvent = new EventEmitter<string>();
    @Output() deleteEvent = new EventEmitter<string>();

    itemsPerPage = 3; // Set items per page to 3
    totalPages = 0;

    constructor(
        private eventService: EventService,
        private http: HttpClient,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loadEvents();
    }

    loadEvents(): void {
        this.isLoading = true;
        this.eventService.getAllEvents().subscribe({
            next: (data: any) => {
                this.events = Array.isArray(data) ? data : [];
                this.calculateTotalPages();
                this.isLoading = false;
            },
            error: (error: HttpErrorResponse) => {
                console.error('Error fetching events:', error);
                this.isLoading = false;
                this.errorMessage = 'Failed to load events. Please try again later.';
            }
        });
    }

    calculateTotalPages(): void {
        this.totalPages = Math.ceil(this.events.length / this.itemsPerPage);
        // If we're on a page that no longer exists, go to the last page
        if (this.currentPage > this.totalPages) {
            this.currentPage = this.totalPages || 1;
        }
    }

    removeEvent(id: string): void {
        if (confirm('Are you sure you want to delete this event?')) {
            this.eventService.deleteEvent(id).subscribe({
                next: () => {
                    this.events = this.events.filter(event => event.idEvent !== id);
                    this.refreshEvents(); // Refresh the list after deletion
                },
                error: (error) => {
                    console.error('Error deleting event:', error);
                    alert('Failed to delete event. Please try again.');
                }
            });
        }
    }

    onEdit(eventId: string): void {
        this.editEvent.emit(eventId);
    }

    navigateToEdit(eventId: string): void {
        const event = this.events.find(e => e.idEvent === eventId);
        if (event) {
            this.selectedEvent = { ...event };
            this.showEditModal = true;
        }
    }

    navigateToAdd(): void {
        this.showAddModal = true;
    }

    openView(eventId: string): void {
        const event = this.events.find(e => e.idEvent === eventId);
        if (event) {
            this.viewingEvent = event;
            this.showViewModal = true;
            document.body.classList.add('modal-open');
        }
    }

    closeViewModal(): void {
        this.showViewModal = false;
        this.viewingEvent = null;
        document.body.classList.remove('modal-open');
    }

    handleEventUpdated(updatedEvent: Event): void {
        const index = this.events.findIndex(e => e.idEvent === updatedEvent.idEvent);
        if (index !== -1) {
            this.events[index] = updatedEvent;
            this.events = [...this.events]; 
        }
        this.closeModals();
    }

    handleEventAdded(newEvent: Event): void {
        this.eventService.addEvent(newEvent).subscribe({
            next: (createdEvent) => {
                this.events = [...this.events, createdEvent];
                this.calculateTotalPages();
                this.currentPage = this.totalPages;
                this.closeModals();
                this.refreshEvents();
            },
            error: (error) => {
                console.error('Error creating event:', error);
                alert('Failed to create event. Please try again.');
            }
        });
    }

    openAddModal(): void {
        this.showAddModal = true;
        document.body.classList.add('modal-open');
    }

    closeAddModal(): void {
        this.showAddModal = false;
    }

    closeModals(): void {
        this.showEditModal = false;
        this.showAddModal = false;
        this.selectedEvent = null;
        document.body.classList.remove('modal-open');
    }

    isOverlapping(event: Event, index: number): boolean {
        if (index === 0) return false;
        
        const previousEvent = this.paginatedEvents[index - 1];
        const isSameDate = new Date(previousEvent.startDate).toDateString() === 
                           new Date(event.startDate).toDateString();
        const isSameTime = previousEvent.startTime === event.startTime;
        
        return isSameDate && isSameTime;
    }

    get paginatedEvents(): Event[] {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.events
            .sort((a, b) => {
                // First sort by date
                const dateComparison = new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
                if (dateComparison !== 0) return dateComparison;
                // Then sort by time if dates are equal
                return (a.startTime || '').localeCompare(b.startTime || '');
            })
            .slice(startIndex, endIndex);
    }

    refreshEvents(): void {
        this.loadEvents();
    }

    changePage(page: number): void {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
        }
    }

    sortEvents(events: Event[]): Event[] {
        return [...events].sort((a, b) => {
            const aValue = a[this.sortField as keyof Event];
            const bValue = b[this.sortField as keyof Event];
            const direction = this.sortDirection === 'asc' ? 1 : -1;
            
            if ((aValue ?? '') < (bValue ?? '')) return -1 * direction;
            if ((aValue ?? '') > (bValue ?? '')) return 1 * direction;
            return 0;
        });
    }

    toggleSort(field: string): void {
        if (this.sortField === field) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortField = field;
            this.sortDirection = 'asc';
        }
    }
}


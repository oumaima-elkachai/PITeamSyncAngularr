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
    selectedEvent: Event | null = null;

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
                this.events = Array.isArray(data.data) ? data.data : [];
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

    navigateToView(eventId: string): void {
        this.router.navigate(['/events/view', eventId]);
    }

    handleEventUpdated(updatedEvent: Event): void {
        const index = this.events.findIndex(e => e.idEvent === updatedEvent.idEvent);
        if (index !== -1) {
            this.events[index] = updatedEvent;
            this.events = [...this.events]; // Create new reference to trigger change detection
        }
        this.closeModals();
    }

    handleEventAdded(newEvent: Event): void {
        this.events.push(newEvent);
        this.calculateTotalPages();
        // Navigate to the last page where the new event was added
        this.currentPage = this.totalPages;
        this.closeModals();
    }

    openAddModal(): void {
        this.showAddModal = true;
    }

    closeAddModal(): void {
        this.showAddModal = false;
    }

    closeModals(): void {
        this.showEditModal = false;
        this.showAddModal = false;
        this.selectedEvent = null;
    }

    get paginatedEvents(): Event[] {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.events.slice(startIndex, endIndex);
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


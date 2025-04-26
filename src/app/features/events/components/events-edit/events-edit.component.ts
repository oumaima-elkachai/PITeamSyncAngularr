import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/core/services/events/events.service';
import { firstValueFrom } from 'rxjs';
import { Event } from '../../models/event.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-events-edit',
  templateUrl: './events-edit.component.html',
  styleUrls: ['./events-edit.component.css']
})
export class EventsEditComponent implements OnInit {
  @Input() event!: Event;
  @Output() eventUpdated = new EventEmitter<Event>();
  @Output() cancel = new EventEmitter<void>();

  selectedFile: File | null = null;
  imagePreviewUrl: string | null = null;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
      private route: ActivatedRoute,
      private eventService: EventService,
      private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.event) {
      console.log('Loading event from route...');

      const eventId = this.route.snapshot.paramMap.get('id');
      console.log('Event ID from route:', eventId);
      if (eventId) {
        this.loadEvent(eventId);
      }
    } else {
      this.isLoading = false;
    }
  }

  loadEvent(eventId: string): void {
    this.eventService.getEventById(eventId).subscribe({
      next: (data: Event) => {
        this.event = data;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = 'Failed to load event.';
        this.isLoading = false;
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  saveEvent(): void {
    if (this.event?.idEvent) {
      this.eventService.updateEvent(
        this.event.idEvent, 
        this.event, 
        this.selectedFile
      ).subscribe({
        next: (updatedEvent) => {
          this.eventUpdated.emit(updatedEvent);
          this.cancel.emit();
        },
        error: (error) => {
          this.errorMessage = 'Failed to update event';
          console.error('Error updating event:', error);
        }
      });
    }
  }

  cancelEdit(): void {
    this.cancel.emit(); // Just emit cancel to close modal
  }
}

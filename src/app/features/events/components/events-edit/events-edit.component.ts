import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/core/services/events/events.service';
import { firstValueFrom } from 'rxjs';
import { Event } from '../../models/event.model';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeEvent } from '../../models/event-type.enum';

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
  eventForm!: FormGroup;
  eventTypes = Object.values(TypeEvent);

  constructor(
      private route: ActivatedRoute,
      private eventService: EventService,
      private router: Router,
      private fb: FormBuilder
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
    this.initForm();
  }

  loadEvent(eventId: string): void {
    this.eventService.getEventById(eventId).subscribe({
      next: (data: Event) => {
        this.event = data;
        this.isLoading = false;
        this.initForm();
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = 'Failed to load event.';
        this.isLoading = false;
      }
    });
  }

  initForm(): void {
    this.eventForm = this.fb.group({
      title: [this.event?.title || '', Validators.required],
      description: [this.event?.description || '', Validators.required],
      startDate: [this.event?.startDate || '', Validators.required],
      endDate: [this.event?.endDate || '', Validators.required],
      startTime: [this.event?.startTime || '', Validators.required],
      endTime: [this.event?.endTime || '', Validators.required],
      capacity: [this.event?.capacity || 1, [Validators.required, Validators.min(1)]],
      eventType: [this.event?.eventType || '', Validators.required]
    });
  }

  get eventTypeControl() {
    return this.eventForm.get('eventType');
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
    if (this.eventForm.valid) {
      // Ensure capacity is a number
      const updatedEvent = {
        ...this.event,
        capacity: Number(this.event.capacity)
      };

      this.eventService.updateEvent(updatedEvent.idEvent!, updatedEvent, this.selectedFile)
        .subscribe({
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

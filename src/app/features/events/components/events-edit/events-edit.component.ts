import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/core/services/events/events.service';
import { firstValueFrom } from 'rxjs';
import { Event } from '../../models/event.model';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
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

  get f() { 
    return this.eventForm.controls; 
  }

  getErrorMessage(controlName: string): string {
    const control = this.f[controlName];
    if (control?.errors) {
      if (control.errors['required']) {
        return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required`;
      }
      if (control.errors['min'] && controlName === 'capacity') {
        return 'Capacity must be at least 1';
      }
      if (control.errors['pastDate']) {
        return 'Date cannot be in the past';
      }
      if (control.errors['pastTime']) {
        return 'Time cannot be in the past';
      }
      if (control.errors['pattern']) {
        return `Invalid ${controlName} format`;
      }
    }
    return '';
  }

  private dateValidator() {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (!control.value) {
        return null;
      }
      const inputDate = new Date(control.value);
      inputDate.setHours(0, 0, 0, 0);
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (inputDate < today) {
        return { 'pastDate': true };
      }
      return null;
    };
  }

  private timeValidator() {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (!control.value) {
        return null;
      }

      const formGroup = control.parent as FormGroup;
      if (!formGroup) {
        return null;
      }

      const startDate = formGroup.get('startDate')?.value;
      const currentTime = new Date();
      const inputTime = control.value;
      
      if (startDate === currentTime.toISOString().split('T')[0] && 
          inputTime < `${currentTime.getHours()}:${currentTime.getMinutes()}`) {
        return { 'pastTime': true };
      }
      return null;
    };
  }

  initForm(): void {
    this.eventForm = this.fb.group({
      title: [this.event?.title || '', [Validators.required]],
      description: [this.event?.description || '', [Validators.required]],
      startDate: [this.event?.startDate || '', [Validators.required, this.dateValidator()]],
      endDate: [this.event?.endDate || '', [Validators.required, this.dateValidator()]],
      startTime: [this.event?.startTime || '', [Validators.required, this.timeValidator()]],
      endTime: [this.event?.endTime || '', [Validators.required]],
      capacity: [this.event?.capacity || 1, [Validators.required, Validators.min(1)]],
      eventType: [this.event?.eventType || '', [Validators.required]]
    });

    // Subscribe to form value changes to check validity
    this.eventForm.valueChanges.subscribe(() => {
      console.log('Form valid:', this.eventForm.valid);
      console.log('Form errors:', this.eventForm.errors);
      Object.keys(this.eventForm.controls).forEach(key => {
        const control = this.eventForm.get(key);
        console.log(`${key} valid:`, control?.valid);
        console.log(`${key} errors:`, control?.errors);
      });
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

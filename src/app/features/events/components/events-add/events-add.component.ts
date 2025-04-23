import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Event } from '../../models/event.model';
import { EventStatus } from '../../models/event-status.enum';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { ParticipantService } from 'src/app/core/services/participant/participant.service';
import { Participant } from '../../../participants/models/participant.model';

@Component({
  selector: 'app-events-add',
  templateUrl: './events-add.component.html',
  styleUrls: ['./events-add.component.css']
})
export class EventsAddComponent implements OnInit {
  @Output() eventAdded = new EventEmitter<Event>();
  @Output() cancel = new EventEmitter<void>();

  eventForm!: FormGroup;
  eventStatuses = Object.values(EventStatus);
  submitted = false;

  searchTerm: string = '';
  searchSubject = new Subject<string>();
  participants: Participant[] = [];
  filteredParticipants: Participant[] = [];
  selectedParticipants: Participant[] = [];

  constructor(
    private fb: FormBuilder,
    private participantService: ParticipantService
  ) {
    this.createForm();
    this.setupSearch();
  }

  ngOnInit() {
    this.loadParticipants();
  }

  private getCurrentDateString(): string {
    return new Date().toISOString().split('T')[0];
  }

  private getCurrentTimeString(): string {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
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
      const startTime = formGroup.get('startTime')?.value;
      const endTime = formGroup.get('endTime')?.value;
      
      // Check if date is today
      const today = new Date();
      const inputDate = new Date(startDate);
      const isToday = inputDate.toISOString().split('T')[0] === today.toISOString().split('T')[0];

      if (isToday && startTime) {
        const currentTime = `${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}`;
        if (startTime < currentTime) {
          return { 'pastTime': true };
        }
      }

      return null;
    };
  }

  private createForm() {
    const currentDate = this.getCurrentDateString();
    const currentTime = this.getCurrentTimeString();

    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      startDate: [currentDate, [Validators.required, this.dateValidator()]],
      endDate: [currentDate, [Validators.required, this.dateValidator()]],
      startTime: [currentTime, [
        Validators.required, 
        Validators.pattern('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$'),
        this.timeValidator()
      ]],
      endTime: [currentTime, [
        Validators.required, 
        Validators.pattern('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')
      ]],
      typeS: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      participantIds: [[], [Validators.required]],
    }, { validator: this.dateTimeValidator });
  }

  private setupSearch() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.filterParticipants(term);
    });
  }

  private loadParticipants() {
    this.participantService.getAllParticipants().subscribe({
      next: (participants) => {
        this.participants = participants;
        this.filteredParticipants = [];
      },
      error: (error) => {
        console.error('Error loading participants:', error);
      }
    });
  }

  onSearchInput(term: string) {
    this.searchSubject.next(term);
  }

  private filterParticipants(term: string) {
    if (!term) {
      this.filteredParticipants = [];
      return;
    }

    term = term.toLowerCase();
    this.filteredParticipants = this.participants.filter(participant => 
      participant.name.toLowerCase().includes(term) || 
      participant.email.toLowerCase().includes(term)
    );
  }

  selectParticipant(participant: Participant) {
    if (participant.id && !this.isParticipantSelected(participant.id)) {
      this.selectedParticipants.push(participant);
      this.eventForm.patchValue({
        participantIds: this.selectedParticipants.map(p => p.id).filter((id): id is string => id !== undefined)
      });
      this.searchTerm = '';
      this.filteredParticipants = [];
    }
  }

  removeParticipant(participantId: string) {
    this.selectedParticipants = this.selectedParticipants.filter(p => p.id !== participantId);
    this.eventForm.patchValue({
      participantIds: this.selectedParticipants.map(p => p.id).filter((id): id is string => id !== undefined)
    });
  }

  isParticipantSelected(participantId: string): boolean {
    return this.selectedParticipants.some(p => p.id === participantId);
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

  dateTimeValidator(group: FormGroup) {
    const startDate = group.get('startDate')?.value;
    const endDate = group.get('endDate')?.value;
    const startTime = group.get('startTime')?.value;
    const endTime = group.get('endTime')?.value;

    if (startDate && endDate && startTime && endTime) {
      const start = new Date(`${startDate}T${startTime}`);
      const end = new Date(`${endDate}T${endTime}`);
      
      if (start >= end) {
        return { dateTimeInvalid: true };
      }
    }
    return null;
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
      if (control.errors['minlength']) {
        return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} must be at least ${control.errors['minlength'].requiredLength} characters`;
      }
      if (control.errors['pattern']) {
        return `Invalid ${controlName} format`;
      }
      if (control.errors['pastDate']) {
        return `This date is in the past, you should choose an anterior date`;
      }
      if (control.errors['pastTime']) {
        return `The time selected is in the past for today's date`;
      }
    }
    return '';
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;
      const event: Event = {
        ...formValue,
        typeS: EventStatus.PLANNED,
        participantIds: this.selectedParticipants
          .map(p => p.id)
          .filter((id): id is string => id !== undefined)
      };
      this.eventAdded.emit(event);
      this.eventForm.reset();
      this.selectedParticipants = [];
      this.submitted = false;
    }
  }

  returnToList() {
    this.cancel.emit();
  }
}

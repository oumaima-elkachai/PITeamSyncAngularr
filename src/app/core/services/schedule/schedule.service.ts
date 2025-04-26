import { Injectable } from '@angular/core';
import { EventService } from '../events/events.service';
import { Event } from '../../../features/events/models/event.model';
import { EventStatus } from '../../../features/events/models/event-status.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { interval, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private checkedEvents: Set<string> = new Set();
  private refreshCalendar = new Subject<void>();
  refreshCalendar$ = this.refreshCalendar.asObservable();

  constructor(
    private eventService: EventService,
    private snackBar: MatSnackBar
  ) {
    this.startEventCheck();
  }

  private startEventCheck() {
    // Check every second instead of every minute
    interval(1000).subscribe(() => {
      this.checkEventsDueDate();
    });
  }

  private checkEventsDueDate() {
    this.eventService.getAllEvents().subscribe(events => {
      const now = new Date();
      events.forEach(event => {
        if (event.typeS === EventStatus.PLANNED && event.idEvent && !this.checkedEvents.has(event.idEvent)) {
          const endDateTime = new Date(`${event.endDate}T${event.endTime}`);
          // Check if the current time is within 1 second of the end time
          const timeDiff = Math.abs(endDateTime.getTime() - now.getTime());
          if (timeDiff <= 1000) {
            this.checkedEvents.add(event.idEvent);
            this.showCompletionConfirmation(event);
          }
        }
      });
    });
  }

  private showCompletionConfirmation(event: Event) {
    const snackBarRef = this.snackBar.open(
      `Event "${event.title}" has ended!`,
      'OK',
      {
        duration: 0,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['notification-snackbar', 'alarm-notification'],
      }
    );

    snackBarRef.onAction().subscribe(() => {
      const updatedEvent = { ...event, typeS: EventStatus.COMPLETED };
      this.eventService.updateEvent(event.idEvent!, updatedEvent).subscribe({
        next: () => {
          this.snackBar.open('Event marked as completed', 'Close', {
            duration: 3000,
            panelClass: ['success-notification']
          });
          this.refreshCalendar.next(); // Trigger calendar refresh
        },
        error: (error) => {
          console.error('Error updating event:', error);
          this.snackBar.open('Error updating event status', 'Close', {
            duration: 3000,
            panelClass: ['error-notification']
          });
        }
      });
    });
  }
}

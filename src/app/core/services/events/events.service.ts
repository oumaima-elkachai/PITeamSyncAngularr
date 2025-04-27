import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Event } from '../../../features/events/models/event.model';
import { Participation } from '../../../features/participation/models/participation.model';
import { ParticipationStatus } from '../../../features/participation/models/participation-status.enum';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8084/api/events';

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<any> {
    return this.http.get<any>(this.apiUrl, {
      headers: new HttpHeaders().set('Cache-Control', 'no-cache')
    }).pipe(
      map((response: any) => {
        if (response && Array.isArray(response)) {
          return response;
        }
        throw new Error('Invalid response format');
      }),
      catchError(this.handleError)
    );
  }

  getEventsInRange(start: Date, end: Date): Observable<Event[]> {
    const params = {
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0]
    };
    return this.http.get<Event[]>(`${this.apiUrl}/by-range`, { params }).pipe(
        catchError(this.handleError)
    );
  }

  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`).pipe(
        catchError(this.handleError)
    );
  }

  addEvent(event: Event, image?: File | null): Observable<Event> {
    const formData = new FormData();
    
    // Ensure type is included in the event object
    const eventWithType = {
      ...event,
      type: event.eventType // Make sure type is set from eventType if not already set
    };
    
    formData.append('event', new Blob([JSON.stringify(eventWithType)], { 
      type: 'application/json' 
    }));
    
    if (image) {
      formData.append('image', image);
    }
    
    return this.http.post<Event>(`${this.apiUrl}/add`, formData).pipe(
      catchError(this.handleError)
    );
  }

  updateEvent(id: string, event: Event, image?: File | null): Observable<Event> {
    const formData = new FormData();
    formData.append('event', new Blob([JSON.stringify(event)], { 
      type: 'application/json' 
    }));
    
    if (image) {
      formData.append('image', image);
    }
  
    return this.http.put<Event>(`${this.apiUrl}/${id}`, formData).pipe(
      catchError(this.handleError)
    );
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
        catchError(this.handleError)
    );
  }

  getTodayEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/today`).pipe(
        catchError(this.handleError)
    );
  }

  addParticipant(eventId: string, participantId: string): Observable<string> {
    return this.http.post(
      `${this.apiUrl}/${eventId}/participants/${participantId}`,
      null,  // No body needed
      { responseType: 'text' }
    ).pipe(
      catchError(this.handleError)
    );
  }

  removeParticipant(eventId: string, participantId: string): Observable<string> {
    return this.http.delete(
        `${this.apiUrl}/${eventId}/participants/${participantId}`,
        { responseType: 'text' }
    ).pipe(
        catchError(this.handleError)
    );
  }

  isEventFull(event: any): boolean {
    return event.capacity && event.participantIds?.length >= event.capacity;
  }

  createParticipation(eventId: string): Observable<any> {
    const participantId = "6804ad54c942d7524f4c8628";
    console.log(`Attempting to add participant ${participantId} to event ${eventId}`);
    
    // Using the endpoint that matches backend controller
    return this.addParticipant(eventId, participantId).pipe(
      map(response => ({
        success: true,
        userId: participantId,
        message: response
      })),
      catchError(error => {
        console.error('Participation error:', error);
        if (error.status === 405) {
          return throwError(() => new Error(`Invalid endpoint method. Please verify the API endpoint configuration.`));
        }
        return this.handleError(error);
      })
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Error details:', {
      status: error.status,
      statusText: error.statusText,
      message: error.message,
      error: error.error
    });
    
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else if (error.error) {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error}`;
    } else if (error.status) {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }
}

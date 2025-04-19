import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Event } from '../../../features/events/models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8080/api/events';

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl, {
      headers: new HttpHeaders().set('Cache-Control', 'no-cache')
    }).pipe(
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

  addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/add`, event).pipe(
        catchError(this.handleError)
    );
  }

  updateEvent(id: string, event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${id}`, event).pipe(
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
        {},
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

  private handleError(error: any): Observable<never> {
    console.error('Error occurred:', error);
    return throwError(() => new Error(
        error.message || 'Server error occurred. Please try again later.'
    ));
  }
}

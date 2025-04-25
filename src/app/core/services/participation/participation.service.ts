import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuditLog } from 'src/app/features/events/models/AuditLog.model';
import { catchError, map } from 'rxjs/operators';
import { Participation } from 'src/app/features/participation/models/participation.model';
import { Event } from 'src/app/features/events/models/event.model';
import { Participant } from 'src/app/features/participants/models/participant.model';
import { EventStatistics } from 'src/app/features/participation/models/event-statistics.model';

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {
  private readonly API_URL = 'http://localhost:8080/api/participations';

  constructor(private http: HttpClient) {}

  // Participation endpoints matching ParticipationController
  addParticipation(participation: Participation): Observable<Participation> {
    return this.http.post<Participation>(this.API_URL, participation)
      .pipe(catchError(this.handleError));
  }

  updateParticipationStatus(id: string, status: string): Observable<Participation> {
    const params = new HttpParams().set('status', status);
    return this.http.patch<Participation>(`${this.API_URL}/${id}/status`, {}, { params })
      .pipe(catchError(this.handleError));
  }

  getParticipationsByParticipant(participantId: string): Observable<Participation[]> {
    return this.http.get<Participation[]>(`${this.API_URL}/by-participant/${participantId}`)
      .pipe(catchError(this.handleError));
  }

  getParticipationsByEvent(eventId: string): Observable<Participation[]> {
    return this.http.get<Participation[]>(`${this.API_URL}/by-event/${eventId}`)
      .pipe(catchError(this.handleError));
  }

  getAllParticipations(): Observable<Participation[]> {
    return this.http.get<Participation[]>(this.API_URL)
      .pipe(catchError(this.handleError));
  }

  deleteParticipation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Audit Log endpoints matching ParticipationController
  getAllAuditLogs(): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(`${this.API_URL}/audit-logs`)
      .pipe(catchError(this.handleError));
  }

  getAuditLogsByParticipation(participationId: string): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(`${this.API_URL}/${participationId}/audit-logs`)
      .pipe(catchError(this.handleError));
  }

  getAuditLogsByEvent(eventId: string): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(`${this.API_URL}/event/${eventId}/audit-logs`)
      .pipe(catchError(this.handleError));
  }

  getAuditLogsByParticipant(participantId: string): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(`${this.API_URL}/participant/${participantId}/audit-logs`)
      .pipe(catchError(this.handleError));
  }

  // New methods for getting event title and participant email
  getEventTitle(eventId: string): Observable<string> {
    return this.http.get<Event>('http://localhost:8080/api/events/' + eventId)
      .pipe(
        map(event => event.title),
        catchError(this.handleError)
      );
  }

  getParticipantEmail(participantId: string): Observable<string> {
    return this.http.get<Participant>('http://localhost:8080/api/participants/' + participantId)
      .pipe(
        map(participant => participant.email),
        catchError(this.handleError)
      );
  }

  // New methods for filtering participations and getting event statistics
  getParticipationsByEventTitle(title: string): Observable<Participation[]> {
    return this.http.get<Participation[]>(`${this.API_URL}/filter/event-title/${title}`);
  }

  getParticipationsByParticipantEmail(email: string): Observable<Participation[]> {
    return this.http.get<Participation[]>(`${this.API_URL}/filter/participant-email/${email}`);
  }

  getEventStatistics(eventId: string): Observable<EventStatistics> {
    return this.http.get<EventStatistics>(`${this.API_URL}/statistics/${eventId}`);
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    let errorMessage = 'An error occurred while processing your request.';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    return throwError(() => errorMessage);
  }
}
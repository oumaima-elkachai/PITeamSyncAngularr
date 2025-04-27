import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of, forkJoin } from 'rxjs';
import { catchError, map, tap, mergeMap } from 'rxjs/operators';
import { Participation } from 'src/app/features/participation/models/participation.model';
import { ParticipationStatus } from 'src/app/features/participation/models/participation-status.enum';
import { Event } from 'src/app/features/events/models/event.model';
import { Participant } from 'src/app/features/participants/models/participant.model';
import { EventStatistics } from 'src/app/features/participation/models/event-statistics.model';
import { AuditLog } from 'src/app/features/events/models/AuditLog.model';

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {
  private readonly API_URL = 'http://localhost:8084/api/participations';
  private readonly eventsUrl = 'http://localhost:8084/api/events';
  private readonly participantsUrl = 'http://localhost:8084/api/participants';

  constructor(private http: HttpClient) {}

  confirmParticipation(id: string): Observable<any> {
    const url = `${this.API_URL}/confirm/${id}`;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    console.log('Sending confirmation request:', {
      url,
      id,
      headers: headers.keys()
    });

    return this.http.put(url, {}, { headers }).pipe(
      tap(response => {
        console.log('Server response:', response);
      }),
      catchError(error => {
        console.error('Confirmation failed:', error);
        const errorMessage = error.error?.message || 'Failed to send confirmation email';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  addParticipation(participation: Participation): Observable<Participation> {
    return this.http.post<Participation>(this.API_URL, participation)
      .pipe(catchError(this.handleError));
  }

  updateParticipationStatus(id: string, status: ParticipationStatus): Observable<any> {
    if (status === ParticipationStatus.CONFIRMED) {
      return this.confirmParticipation(id).pipe(
        catchError(error => {
          console.error('Error during confirmation process:', error);
          return throwError(() => error);
        })
      );
    }

    if (!Object.values(ParticipationStatus).includes(status)) {
      console.error('Invalid status:', status);
      return throwError(() => new Error('Invalid status value'));
    }

    const url = `${this.API_URL}/${id}/status`;
    const headers = new HttpHeaders().set('Content-Type', 'text/plain');
    const statusString = status.toString();

    console.log('Sending status update:', {
      url,
      status: statusString,
      method: 'PATCH'
    });

    return this.http.patch(url, statusString, { headers }).pipe(
      tap(response => {
        console.log('Status update successful:', response);
      }),
      catchError(error => {
        console.error('Status update failed:', error);
        if (error.status === 400) {
          return throwError(() => new Error(error.error || 'Invalid status'));
        }
        return throwError(() => new Error('Failed to update status'));
      })
    );
  }

  updateStatus(id: string, status: ParticipationStatus): Observable<any> {
    console.log(`Updating participation ${id} to status ${status}`);
    
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    return this.http.put(`${this.API_URL}/${id}/status`, { status }, { headers }).pipe(
      tap(response => {
        console.log('Status update response:', response);
      }),
      catchError(this.handleDetailedError)
    );
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
    return this.http.get<any[]>(this.API_URL).pipe(
      mergeMap(participations => {
        const eventRequests = participations.map(p => 
          this.http.get<any>(`${this.eventsUrl}/${p.eventId}`).pipe(
            map(event => ({
              id: p._id,
              participantId: p.participantId,
              eventId: p.eventId,
              participationDate: p.participationDate,
              participationS: this.mapParticipationStatus(p.participationStatus),
              participantEmail: '',
              eventTitle: event.title || '',
              eventType: event.eventType || 'Uncategorized'
            })),
            catchError(() => of({
              id: p._id,
              participantId: p.participantId,
              eventId: p.eventId,
              participationDate: p.participationDate,
              participationS: this.mapParticipationStatus(p.participationStatus),
              participantEmail: '',
              eventTitle: 'Unknown Event',
              eventType: 'Uncategorized'
            }))
          )
        );
        return forkJoin(eventRequests);
      }),
      catchError(this.handleError)
    );
  }

  deleteParticipation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`)
      .pipe(catchError(this.handleError));
  }

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

  getEventTitle(eventId: string): Observable<string> {
    return this.http.get<any>(`${this.eventsUrl}/${eventId}`).pipe(
      map(event => event.title),
      catchError(() => of('Unknown Event'))
    );
  }

  getParticipantEmail(participantId: string): Observable<string> {
    return this.http.get<any>(`${this.participantsUrl}/${participantId}`).pipe(
      map(participant => participant.email),
      catchError(() => of('Unknown Participant'))
    );
  }

  getParticipationsByEventTitle(title: string): Observable<Participation[]> {
    return this.http.get<Participation[]>(`${this.API_URL}/filter/event-title/${title}`);
  }

  getParticipationsByParticipantEmail(email: string): Observable<Participation[]> {
    return this.http.get<Participation[]>(`${this.API_URL}/filter/participant-email/${email}`);
  }

  getEventStatistics(eventId: string): Observable<EventStatistics> {
    return this.http.get<EventStatistics>(`${this.API_URL}/statistics/${eventId}`);
  }

  private mapParticipationStatus(status: string): ParticipationStatus {
    switch(status) {
      case 'PENDING':
        return ParticipationStatus.PENDING;
      case 'CONFIRMED':
        return ParticipationStatus.CONFIRMED;
      case 'CANCELLED':
        return ParticipationStatus.CANCELLED;
      case 'WAITLISTED':
        return ParticipationStatus.WAITLISTED;
      default:
        return ParticipationStatus.PENDING;
    }
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

  private handleDetailedError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      
      if (error.error?.message) {
        errorMessage += `\nDetail: ${error.error.message}`;
      }
    }
    
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
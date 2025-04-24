import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {AuditLog} from 'src/app/features/events/models/AuditLog.model';
import { catchError } from 'rxjs/operators';
import { Participation } from 'src/app/features/participation/models/participation.model';
@Injectable({
  providedIn: 'root'
})
export class ParticipationService {
  private readonly API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // Participation endpoints
  addParticipation(participation: Participation): Observable<Participation> {
    return this.http.post<Participation>(
      `${this.API_URL}/participations`,
      participation
    ).pipe(
      catchError(this.handleError)
    );
  }

  updateParticipationStatus(id: string, status: string): Observable<Participation> {
    const params = new HttpParams().set('status', status);
    return this.http.patch<Participation>(
      `${this.API_URL}/participations/${id}/status`,
      {},
      { params }
    ).pipe(
      catchError(this.handleError)
    );
  }

  getParticipationsByParticipant(participantId: string): Observable<Participation[]> {
    return this.http.get<Participation[]>(
      `${this.API_URL}/participations/by-participant/${participantId}`
    ).pipe(
      catchError(this.handleError)
    );
  }

  getParticipationsByEvent(eventId: string): Observable<Participation[]> {
    return this.http.get<Participation[]>(
      `${this.API_URL}/participations/by-event/${eventId}`
    ).pipe(
      catchError(this.handleError)
    );
  }

  // Audit Log endpoints
  getAuditLogs(): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(
      `${this.API_URL}/audit-logs`
    ).pipe(
      catchError(this.handleError)
    );
  }

  getAuditLogsByParticipation(participationId: string): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(
      `${this.API_URL}/audit-logs/participation/${participationId}`
    ).pipe(
      catchError(this.handleError)
    );
  }

  getAuditLogsByEvent(eventId: string): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(
      `${this.API_URL}/audit-logs/event/${eventId}`
    ).pipe(
      catchError(this.handleError)
    );
  }

  getAuditLogsByParticipant(participantId: string): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(
      `${this.API_URL}/audit-logs/participant/${participantId}`
    ).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    let errorMessage = 'An error occurred while processing your request.';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    return throwError(() => errorMessage);
  }
}
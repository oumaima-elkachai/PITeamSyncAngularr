import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuditLog } from 'src/app/features/events/models/AuditLog.model';

@Injectable({
  providedIn: 'root'
})

export class AuditLogService {
  // Update base URL to remove v1 since it's not in the API path
  private readonly baseUrl = 'http://localhost:8080/api/audit-logs';

  constructor(private http: HttpClient) {}

  getAllAuditLogs(): Observable<AuditLog[]> {
    console.log('Fetching audit logs from:', this.baseUrl);
    return this.http.get<AuditLog[]>(this.baseUrl)
      .pipe(
        catchError(error => {
          console.error('Error fetching audit logs:', error);
          return this.handleError(error);
        })
      );
  }

  getByParticipationId(participationId: string): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(`${this.baseUrl}/participation/${participationId}`)
      .pipe(catchError(this.handleError));
  }

  getByEventId(eventId: string): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(`${this.baseUrl}/event/${eventId}`)
      .pipe(catchError(this.handleError));
  }

  getByParticipantId(participantId: string): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(`${this.baseUrl}/participant/${participantId}`)
      .pipe(catchError(this.handleError));
  }

  createAuditLog(auditLog: Omit<AuditLog, 'id'>): Observable<AuditLog> {
    return this.http.post<AuditLog>(this.baseUrl, auditLog)
      .pipe(catchError(this.handleError));
  }

  getAuditLogsByDateRange(startDate: Date, endDate: Date): Observable<AuditLog[]> {
    const params = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    };
    return this.http.get<AuditLog[]>(`${this.baseUrl}/by-date-range`, { params })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred while processing your request.';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error('AuditLogService Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
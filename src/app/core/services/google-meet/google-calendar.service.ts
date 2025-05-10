import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleCalendarService {
  private apiUrl = `${environment.apiUrl}/calendar`;

  constructor(private http: HttpClient) {}

  generateMeetLink(eventData: {
    eventId: string;
    title: string;
    startTime: Date;
    endTime: Date;
  }): Observable<{meetLink: string}> {
    return this.http.post<{meetLink: string}>(`${this.apiUrl}/generate-meet`, eventData);
  }
}

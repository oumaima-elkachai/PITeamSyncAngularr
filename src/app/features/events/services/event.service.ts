import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = `${environment.apiUrl}/events`;

  constructor(private http: HttpClient) {}

  getEventsByDateRange(start: Date, end: Date): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/range`, {
      params: {
        startDate: start.toISOString(),
        endDate: end.toISOString()
      }
    });
  }
}

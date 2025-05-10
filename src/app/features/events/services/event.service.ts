import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParticipationStatus } from 'src/app/features/participation/models/participation-status.enum';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:3000/api'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  createParticipation(eventId: number): Observable<any> {
    const randomUserId = Math.floor(Math.random() * 1000) + 1;
    const participation = {
      eventId: eventId,
      userId: randomUserId,
      participationS: ParticipationStatus.PENDING,
      participationDate: new Date()
    };
    
    return this.http.post(`${this.apiUrl}/participations`, participation);
  }

  isEventFull(event: any): boolean {
    return event.capacity && event.participantIds?.length >= event.capacity;
  }
}
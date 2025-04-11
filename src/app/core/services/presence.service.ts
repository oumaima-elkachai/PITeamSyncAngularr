
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Presence } from 'src/app/models/presencemodel';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {

  private apiUrl = 'http://localhost:8082/api/attendances';
  private employeeApiUrl = 'http://localhost:8082/api/employees'; // URL pour récupérer les employés


  constructor(private http: HttpClient) {}

  
  getAllPresences(): Observable<Presence[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`).pipe(
      map(presences => presences.map(p => ({
        ...p,
        date: new Date(p.date), // Conversion de la date
        hoursWorked: p.hoursWorked || 0,
        overtimeHours: p.overtimeHours || 0
      })))
    );
  }
  // Récupérer le nom de l'employé par ID
  getEmployeeName(employeeId: string): Observable<string> {
    return this.http.get<string>(`${this.employeeApiUrl}/${employeeId}/name`);
  }

  

  getPresenceById(id: string): Observable<Presence> {
    return this.http.get<Presence>(`${this.apiUrl}/${id}`);
  }

  savePresence(presence: Presence): Observable<Presence> {
    return this.http.post<Presence>(`${this.apiUrl}/saveAttendance`, presence);
  }

  

  updatePresence(id: string, presence: Presence): Observable<Presence> {
    return this.http.put<Presence>(`${this.apiUrl}/updatePresenceManually/${id}`, presence);
  }
  
  
  

  deletePresence(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}


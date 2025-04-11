import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from 'src/app/models/presencemodel';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private baseUrl = 'http://localhost:8082/api/requests';

  constructor(private http: HttpClient) {}

  private apiUrll = 'http://localhost:8082/api/requests/create';  // Changez l'URL en fonction de votre API

  

  createRequest(request: any): Observable<any> {
    return this.http.post<any>(this.apiUrll, request);
  }

  getAllRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.baseUrl}/all`);
  }
  
  getRequestsByEmployee(employeeId: string): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.baseUrl}/employee?employeeId=${employeeId}`);
  }

  deleteRequest(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
  
  getRequestById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  updateRequest(id: string, updatedRequest: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, updatedRequest);
  }

  updateStatus(id: string, status: string): Observable<Request> {
    return this.http.put<Request>(`${this.baseUrl}/${id}/status?status=${status}`, {});
  }
  
  
}

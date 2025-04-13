import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/features/employee/models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8082/api/employees';  // L'URL de votre API Spring

  constructor(private http: HttpClient) {}

  // Récupérer tous les employés
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }
  getEmployeeById(employeeId: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${employeeId}`);
}
}

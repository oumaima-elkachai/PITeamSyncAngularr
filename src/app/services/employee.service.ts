import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Employee } from '../models/employee.model';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private baseUrl = `${environment.apiUrl}/employees`;

  constructor(private http: HttpClient) { }

   


  getEmployeeAssignedTasks(employeeId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/${employeeId}/tasks`);
  }

  getUpcomingDeadlines(employeeId: string, daysAhead = 7): Observable<Task[]> {
    return this.http.get<Task[]>(
      `${this.baseUrl}/${employeeId}/upcoming-deadlines`,
      { params: new HttpParams().set('daysAhead', daysAhead.toString()) }
    );
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl);
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${id}`);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, employee);
  }

  updateEmployee(id: string, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/${id}`, employee);
  }

  deleteEmployee(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getEmployeesByProject(projectId: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/project/${projectId}`);
  }

  getByDepartment(department: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/department/${department}`);
  }

  getBySkills(skills: string[]): Observable<Employee[]> {
    // Convert skills array to HTTP params (e.g., ?skills=FRONTEND&skills=TESTING)
    let params = new HttpParams();
    skills.forEach(skill => params = params.append('skills', skill));
    
    return this.http.get<Employee[]>(`${this.baseUrl}/filter`, { params });
  }

}
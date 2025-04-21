import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private baseUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) { }

  // Add this method to your task.service.ts

  getEmployeeTasks(employeeId: string): Observable<Task[]> {
    // Using the endpoint structure from your existing backend
    return this.http.get<Task[]>(`${environment.apiUrl}/employees/${employeeId}/tasks`);
  }

  getTasksByProject(projectId: string): Observable<Task[]> {
    // Use the correct endpoint path with query parameters
    const params = new HttpParams().set('projectId', projectId);

    return this.http.get<Task[]>(`${this.baseUrl}/by-project`, { params });
  }

  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/${id}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task);
  }

  updateTask(id: string, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${id}`, task);
  }

  assignTask(taskId: string, employeeId: string): Observable<Task> {
    return this.http.patch<Task>(`${this.baseUrl}/${taskId}/assign`, { employeeId });
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }




}
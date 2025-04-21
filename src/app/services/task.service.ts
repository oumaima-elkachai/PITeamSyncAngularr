import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task.model';
import { Attachment } from '../models/attachment.model';

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

  // task.service.ts
  getTaskWithAttachments(taskId: string): Observable<Task> {
    return forkJoin([
      this.http.get<Task>(`${this.baseUrl}/${taskId}`),
      this.http.get<Attachment[]>(`${environment.apiUrl}/attachments/task/${taskId}`)
    ]).pipe(
      map(([task, attachments]) => {
        task.attachments = attachments;
        return task;
      })
    );
  }

// task.service.ts
requestExtension(taskId: string, newDeadline: Date): Observable<Task> {
  // Format date manually to ensure ISO string
  const isoDate = `${newDeadline.getFullYear()}-${(newDeadline.getMonth() + 1).toString().padStart(2, '0')}-${newDeadline.getDate().toString().padStart(2, '0')}`;
  
  const params = new HttpParams().set('newDeadline', isoDate);

  return this.http.post<Task>(
    `${this.baseUrl}/${taskId}/request-extension`,
    {},
    { params }
  );
}

addLink(taskId: string, linkRequest: any): Observable<Task> {
  return this.http.post<Task>(
    `${this.baseUrl}/${taskId}/links`,
    linkRequest
  );
}

removeLink(taskId: string, index: number): Observable<Task> {
  return this.http.delete<Task>(
    `${this.baseUrl}/${taskId}/links/${index}`
  );
}

// task.service.ts
approveExtension(taskId: string): Observable<Task> {
  return this.http.patch<Task>(`${this.baseUrl}/${taskId}/approve-extension`, {});
}

rejectExtension(taskId: string): Observable<Task> {
  return this.http.patch<Task>(`${this.baseUrl}/${taskId}/reject-extension`, {});
}

downloadAttachment(attachmentId: string): Observable<Blob> {
  return this.http.get(`${this.baseUrl}/attachments/${attachmentId}/download`, {
    responseType: 'blob'
  });
}










}
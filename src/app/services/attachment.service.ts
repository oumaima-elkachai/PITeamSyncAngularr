// attachment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Attachment } from '../models/attachment.model';

@Injectable({ providedIn: 'root' })
export class AttachmentService {
   
  private baseUrl = `${environment.apiUrl}/attachments`;

  constructor(private http: HttpClient) { }

  getTaskAttachments(taskId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/task/${taskId}`);
  }

  uploadFile(file: File, taskId: string, userId: string): Observable<Attachment> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('taskId', taskId);
    formData.append('userId', userId);
    
    return this.http.post<Attachment>(`${this.baseUrl}/upload`, formData);
  }

  deleteAttachment(attachmentId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${attachmentId}`);
  }


}
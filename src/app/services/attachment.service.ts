// attachment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { Attachment } from '../models/attachment.model';

@Injectable({ providedIn: 'root' })
export class AttachmentService {

  private baseUrl = `${environment.apiUrl}/attachments`;

  constructor(private http: HttpClient) { }

  getTaskAttachments(taskId: string): Observable<Attachment[]> {
    return this.http.get<Attachment[]>(
      `${this.baseUrl}/task/${taskId}`
    );
  }

  // attachment.service.ts
  downloadAttachment(attachmentId: string): Observable<{ blob: Blob, fileName: string }> {
    return this.http.get(`${this.baseUrl}/download/${attachmentId}`, {
      responseType: 'blob',
      observe: 'response'
    }).pipe(
      map(response => {
        const contentDisposition = response.headers.get('Content-Disposition') || '';
        const fileNameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
        const fileName = fileNameMatch ? fileNameMatch[1] : 'file';

        return {
          blob: response.body as Blob,
          fileName: fileName
        };
      })
    );
  }

  uploadFile(file: File, taskId: string, userId: string): Observable<Attachment> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('taskId', taskId);
    formData.append('userId', userId);

    return this.http.post<Attachment>(`${this.baseUrl}/upload`, formData);
  }

  // attachment.service.ts
  deleteAttachment(attachmentId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${attachmentId}`);
  }


}
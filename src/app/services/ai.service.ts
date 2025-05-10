import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AiService {

    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    generateTaskDescription(
        taskTitle: string,
        projectContext: string,
        taskType: string
      ): Observable<{ description: string }> {
        return this.http.post<{ description: string }>(
          `${this.apiUrl}/ai/generate-description`,  // ← note the extra `/api`
          { taskTitle, projectContext, taskType }
        );
      }
}
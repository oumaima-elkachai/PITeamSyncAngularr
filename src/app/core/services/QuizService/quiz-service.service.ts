import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private apiUrl = 'http://localhost:8080/api/applications';

  constructor(private http: HttpClient) {}

  generateQuiz(jobId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/generate-quiz/${jobId}`, null, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}

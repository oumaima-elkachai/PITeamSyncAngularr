// src/app/core/services/jobquiz/jobquiz.service.ts
import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class JobQuizService {
  private apiUrl = 'http://localhost:8080/api/applications';  // URL de votre API Spring Boot

  constructor(private http: HttpClient) {}

  // Méthode pour générer le quiz
 // job-quiz.service.ts
generateQuiz(jobId: string, jobDescription: string): Observable<any> {
  const payload = {
    jobId: jobId,
    jobDescription: jobDescription
  };

  return this.http.post<any>(`http://localhost:8080/generate-quiz/${jobId}`, payload, {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  });
}

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobQuizService {

  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  // Génération des questions d'entretien
  generateQuestions(jobDescription: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/generate-questions`, {
      job_description: jobDescription
    });
  }

  // Évaluation de la réponse du candidat
  evaluateAnswer(question: string, answer: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/evaluate-answer`, {
      question,
      answer
    });
  }
}

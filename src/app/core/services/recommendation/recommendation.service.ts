import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecommendationResponse } from 'src/app/features/recommendation/interfaces/recommendation.interface';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  private readonly API_URL = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  getRecommendations(participantId: string): Observable<RecommendationResponse> {
    return this.http.get<RecommendationResponse>(`${this.API_URL}/recommendations/${participantId}`);
  }
}

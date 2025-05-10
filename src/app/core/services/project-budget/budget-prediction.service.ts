import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetPredictionService {

  private apiUrl = 'http://localhost:5000/predict-budget-score'; // URL de ton API Flask

  constructor(private http: HttpClient) { }

  // Méthode pour envoyer les données et récupérer la prédiction
  getBudgetPrediction(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}

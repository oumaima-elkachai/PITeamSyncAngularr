import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnomalyDetectionService {

  private apiUrl = 'http://localhost:5000/detect-anomalies';  // L'URL de ton API Flask

  constructor(private http: HttpClient) { }

  // Méthode pour envoyer les paiements à l'API Flask et récupérer les anomalies
  detectAnomalies(payments: any[]): Observable<any> {
    return this.http.post<any[]>(this.apiUrl, payments);
  }
}

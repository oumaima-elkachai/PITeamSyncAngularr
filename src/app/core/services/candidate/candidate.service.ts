// src/app/core/services/candidate/candidate.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidate } from 'src/app/features/candidate/models/candidate.model'; // 🟡 adapte le chemin si nécessaire

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private apiUrl = 'http://localhost:8080/api/candidates';

  constructor(private http: HttpClient) {}

  // 📡 Récupérer un candidat par son ID
  getCandidateById(id: string): Observable<Candidate> {
    return this.http.get<Candidate>(`${this.apiUrl}/${id}`);
  }

  // (optionnel) Récupérer tous les candidats
  getAllCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(this.apiUrl);
  }

  // (optionnel) Ajouter un candidat
  addCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.post<Candidate>(this.apiUrl, candidate);
  }
}

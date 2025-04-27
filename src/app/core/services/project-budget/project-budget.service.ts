import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectBudget } from 'src/app/features/project-budget/models/project-budget.model';


@Injectable({
  providedIn: 'root'
})
export class ProjectBudgetService {

  private baseUrl = 'http://localhost:8082/api/project-budgets';
  private predictUrl = 'http://localhost:5000/predict';

  constructor(private http: HttpClient) {}

  getAllProjectBudgets(): Observable<ProjectBudget[]> {
    return this.http.get<ProjectBudget[]>(this.baseUrl);
  }

  getProjectBudgetById(id: string): Observable<ProjectBudget> {
    return this.http.get<ProjectBudget>(`${this.baseUrl}/${id}`);
  }
  
  
  createProjectBudget(budget: ProjectBudget): Observable<ProjectBudget> {
    return this.http.post<ProjectBudget>(this.baseUrl, budget);
  }

  updateProjectBudget(id: string, budget: ProjectBudget): Observable<ProjectBudget> {
    return this.http.put<ProjectBudget>(`${this.baseUrl}/${id}`, budget);
  }

  deleteProjectBudget(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getBudgetAnalytics(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/analytics`);
  }

   // Méthode pour envoyer les données et récupérer la prédiction
   getBudgetScore(data: { allocatedFunds: number, usedFunds: number }): Observable<{ budget_score: number }> {
    // On transforme les noms pour correspondre au backend
    return this.http.post<{ budget_score: number }>(this.predictUrl, {
      allocated_funds: data.allocatedFunds,
      used_funds: data.usedFunds
    });
  }
  
}

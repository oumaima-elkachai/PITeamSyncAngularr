import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectBudget } from 'src/app/features/project-budget/models/project-budget.model';


@Injectable({
  providedIn: 'root'
})
export class ProjectBudgetService {

  private baseUrl = 'http://localhost:8082/api/project-budgets';

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
}

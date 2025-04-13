import { Component, OnInit } from '@angular/core';
import { ProjectBudget } from '../../models/project-budget.model';
import { ProjectBudgetService } from 'src/app/core/services/project-budget/project-budget.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-budget-list',
  templateUrl: './project-budget-list.component.html',
  styleUrls: ['./project-budget-list.component.css'],
})
export class ProjectBudgetsListComponent implements OnInit {
  budgets: ProjectBudget[] = [];
  projectNames: Map<string, string> = new Map();

  constructor(private budgetService: ProjectBudgetService, private router: Router) {}

  ngOnInit(): void {
    this.loadBudgets();
  }

  loadBudgets(): void {
    this.budgetService.getAllProjectBudgets().subscribe(
      (data: ProjectBudget[]) => {
        this.budgets = data;
        this.budgets.forEach(budget => {
          if (budget.projet && budget.projet.id) {
            this.projectNames.set(budget.projet.id, budget.projet.name);
          }
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération des budgets de projet', error);
      }
    );
  }

  getProjectName(projectId: string): string {
    return this.projectNames.get(projectId) ?? 'Projet inconnu';
  }

  onEdit(budget: ProjectBudget): void {
    console.log('Navigating to edit with ID:', budget.id); // Ajoutez cette ligne
    this.router.navigate(['/admin/project-budgets/edit', budget.id]);
  }
  
  
  onDelete(budgetId: string): void {
    // Vérification que l'ID est défini
    if (!budgetId) {
      console.error('ID du budget de projet invalide');
      return;
    }
  
    // Appel à la méthode de suppression du service
    this.budgetService.deleteProjectBudget(budgetId).subscribe(
      () => {
        console.log('Budget de projet supprimé avec succès');
        this.loadBudgets();
      },
      (error) => {
        console.error('Erreur lors de la suppression du budget de projet', error);
      }
    );
  }
  
}

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
  searchTerm: string = '';
  filter: string = 'all';
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 4;
  // Tri
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

sortBy(column: string): void {
  if (this.sortColumn === column) {
    // Toggle direction
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortColumn = column;
    this.sortDirection = 'asc';
  }
}


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
  getUsagePercentage(budget: ProjectBudget): number {
    if (!budget.allocatedFunds || budget.allocatedFunds === 0) return 0;
    return Math.round((budget.usedFunds / budget.allocatedFunds) * 100);
  }
  
  getBadgeClass(percentage: number): string {
    if (percentage < 50) return 'bg-success';
    if (percentage < 80) return 'bg-warning';
    return 'bg-danger';
  }
  getFilteredBudgets(): ProjectBudget[] {
    let filtered = this.budgets;
  
    if (this.searchTerm) {
      filtered = filtered.filter(budget =>
        budget.projet.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  
    switch (this.filter) {
      case 'low':
        filtered = filtered.filter(budget => this.getUsagePercentage(budget) <= 50);
        break;
      case 'high':
        filtered = filtered.filter(budget => this.getUsagePercentage(budget) >= 50);
        break;
    }
  
    // Tri
    if (this.sortColumn) {
      filtered = [...filtered].sort((a, b) => {
        const valA = this.getColumnValue(a, this.sortColumn);
        const valB = this.getColumnValue(b, this.sortColumn);
  
        if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
  
    return filtered;
  }
  
  getColumnValue(budget: ProjectBudget, column: string): any {
    switch (column) {
      case 'name': return budget.projet.name.toLowerCase();
      case 'allocatedFunds': return budget.allocatedFunds;
      case 'usedFunds': return budget.usedFunds;
      case 'usage': return this.getUsagePercentage(budget);
      default: return '';
    }
  }
  onFilterChange(newFilter: string): void {
    this.filter = newFilter;
    this.loadBudgets();
  }

  // Pagination
  get paginatedBudgets(): ProjectBudget[] {
    const filtered = this.getFilteredBudgets();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(startIndex, startIndex + this.itemsPerPage);
  }
  
  get totalPages(): number {
    return Math.ceil(this.getFilteredBudgets().length / this.itemsPerPage);
  }
  
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  
}

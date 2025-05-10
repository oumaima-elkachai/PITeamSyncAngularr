import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectBudgetService } from 'src/app/core/services/project-budget/project-budget.service';
import { Router } from '@angular/router';
import { Projet } from '../../models/projet.model';
import { ProjetService } from 'src/app/core/services/project/project.service';

@Component({
  selector: 'app-project-budget-add',
  templateUrl: './project-budget-add.component.html',
  styleUrls: ['./project-budget-add.component.css']
})
export class ProjectBudgetsAddComponent implements OnInit {
  budgetForm!: FormGroup;
  projets: Projet[] = [];
  projetsAvecBudget: string[] = [];
  erreurProjet: string = '';

  constructor(
    private fb: FormBuilder,
    private budgetService: ProjectBudgetService,
    private projetService: ProjetService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadProjets();
    this.loadBudgets();
  }

  initForm(): void {
    this.budgetForm = this.fb.group({
      projetId: ['', Validators.required],
      allocatedFunds: [0, [Validators.required, Validators.min(1)]],
      usedFunds: [0, [Validators.required, Validators.min(0)]],
    });
  }

  loadProjets(): void {
    this.projetService.getAllProjets().subscribe(
      (data: Projet[]) => {
        this.projets = data;
      },
      (error) => {
        console.error('Error fetching projects', error);
        alert("Error loading projects.");
      }
    );
  }

  loadBudgets(): void {
    this.budgetService.getAllProjectBudgets().subscribe(
      (budgets) => {
        this.projetsAvecBudget = budgets.map((b: any) => b.projet.id);
      },
      (error) => {
        console.error('Error fetching budgets', error);
      }
    );
  }

  onSubmit(): void {
    this.erreurProjet = '';
    if (this.budgetForm.valid) {
      const projetId = this.budgetForm.value.projetId;
  
      // Check: if this project already has a budget
      if (this.projetsAvecBudget.includes(projetId)) {
        this.erreurProjet = 'This project already has an associated budget.';
        return;
      }
  
      const selectedProjet = this.projets.find(p => p.id === projetId);
      if (!selectedProjet) {
        this.erreurProjet = 'Project not found.';
        return;
      }
  
      const payload = {
        projet: selectedProjet,
        allocatedFunds: this.budgetForm.value.allocatedFunds,
        usedFunds: this.budgetForm.value.usedFunds,
        predictionResult: '', // Add default value
        errorMessage: ''      // Add default value
      };
  
      this.budgetService.createProjectBudget(payload).subscribe(() => {
        alert('Budget successfully added!');
        
        // Reload the page (hard reload)
        window.location.reload();
  
      }, error => {
        console.error('Error creating budget', error);
        alert('Error creating budget.');
      });
    }
  }
  
}

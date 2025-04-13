import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectBudgetService } from 'src/app/core/services/project-budget/project-budget.service';
import { ProjetService } from 'src/app/core/services/project/project.service';
import { Projet } from '../../models/projet.model';

@Component({
  selector: 'app-edit-project-budget',
  templateUrl: './project-budget-edit.component.html',
  styleUrls: ['./project-budget-edit.component.css']
})
export class ProjectBudgetEditComponent implements OnInit {
  budgetForm!: FormGroup; // Ajout de '!' pour indiquer que cette variable sera initialisée plus tard
  projets: Projet[] = []; // Déclaration du tableau avec un type explicite
  budgetId!: string; // Ajout de '!' pour indiquer que cette variable sera initialisée plus tard

  constructor(
    private formBuilder: FormBuilder,
    private budgetService: ProjectBudgetService,
    private projetService: ProjetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.budgetId = this.route.snapshot.paramMap.get('id')!;
    this.initializeForm(); // Initialiser le formulaire d'abord
    this.loadProjets();
    this.loadBudget();
  }

  loadProjets(): void {
    this.projetService.getAllProjets().subscribe(
      (projets) => {
        this.projets = projets;
      },
      (error) => {
        console.error('Erreur lors du chargement des projets', error);
        // Afficher un message d'erreur si nécessaire
      }
    );
  }

  loadBudget(): void {
    this.budgetService.getProjectBudgetById(this.budgetId).subscribe(
      (budget) => {
        if (budget && budget.projet) {
          this.budgetForm.patchValue({
            projetId: budget.projet.id,
            allocatedFunds: budget.allocatedFunds,
            usedFunds: budget.usedFunds
          });
        } else {
          console.error('Le budget ne contient pas de projet valide');
          // Afficher un message d'erreur si le projet est manquant
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération du budget', error);
        // Afficher un message d'erreur utilisateur ici
      }
    );
  }

  initializeForm(): void {
    this.budgetForm = this.formBuilder.group({
      projetId: ['', Validators.required],
      allocatedFunds: ['', [Validators.required, Validators.min(0)]],
      usedFunds: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.budgetForm.invalid) {
      return;
    }
    const updatedBudget = this.budgetForm.value;
    this.budgetService.updateProjectBudget(this.budgetId, updatedBudget).subscribe(
      () => {
        console.log('Budget de projet mis à jour avec succès');
        alert('Budget de projet mis à jour avec succès');
        // Redirection vers la liste des budgets
        this.router.navigate(['admin/project-budget']);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du budget de projet', error);
        alert('Erreur lors de la mise à jour du budget');
      }
    );
  }
  
}

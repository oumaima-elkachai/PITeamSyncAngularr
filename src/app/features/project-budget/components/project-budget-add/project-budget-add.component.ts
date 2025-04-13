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
        console.error('Erreur lors de la récupération des projets', error);
        alert("Erreur de chargement des projets.");
      }
    );
  }

  loadBudgets(): void {
    this.budgetService.getAllProjectBudgets().subscribe(
      (budgets) => {
        this.projetsAvecBudget = budgets.map((b: any) => b.projet.id);
      },
      (error) => {
        console.error('Erreur récupération des budgets', error);
      }
    );
  }

  onSubmit(): void {
    this.erreurProjet = '';
    if (this.budgetForm.valid) {
      const projetId = this.budgetForm.value.projetId;

      // ✅ Vérification : si ce projet a déjà un budget
      if (this.projetsAvecBudget.includes(projetId)) {
        this.erreurProjet = 'Ce projet a déjà un budget associé.';
        return;
      }

      const selectedProjet = this.projets.find(p => p.id === projetId);
      if (!selectedProjet) {
        this.erreurProjet = 'Projet introuvable.';
        return;
      }

      const payload = {
        projet: selectedProjet,
        allocatedFunds: this.budgetForm.value.allocatedFunds,
        usedFunds: this.budgetForm.value.usedFunds
      };

      this.budgetService.createProjectBudget(payload).subscribe(() => {
        alert('Budget ajouté avec succès !');
        
        // ✅ Recharge la page entière (hard reload)
        window.location.reload();

      }, error => {
        console.error('Erreur lors de la création du budget', error);
        alert('Erreur lors de la création du budget.');
      });
    }
  }
}

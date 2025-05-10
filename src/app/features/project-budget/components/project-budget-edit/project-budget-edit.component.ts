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
  budgetForm!: FormGroup; // Declaring the budget form
  projets: Projet[] = []; // List of projects
  budgetId!: string; // Budget ID passed from the route

  constructor(
    private formBuilder: FormBuilder,
    private budgetService: ProjectBudgetService,
    private projetService: ProjetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.budgetId = this.route.snapshot.paramMap.get('id')!; // Retrieve budget ID from route
    this.initializeForm(); // Initialize form
    this.loadProjets(); // Load all projects
    this.loadBudget(); // Load the specific budget by ID
  }

  loadProjets(): void {
    // Fetch projects and handle errors
    this.projetService.getAllProjets().subscribe(
      (projets) => {
        this.projets = projets;
      },
      (error) => {
        console.error('Error loading projects', error);
        alert('Failed to load projects. Please try again later.');
      }
    );
  }

  loadBudget(): void {
    // Fetch the budget by ID and populate the form
    this.budgetService.getProjectBudgetById(this.budgetId).subscribe(
      (budget) => {
        if (budget && budget.projet) {
          this.budgetForm.patchValue({
            projetId: budget.projet.id,
            allocatedFunds: budget.allocatedFunds,
            usedFunds: budget.usedFunds
          });
        } else {
          console.error('The budget does not contain a valid project');
          alert('The budget does not have a valid project.');
        }
      },
      (error) => {
        console.error('Error fetching the project budget', error);
        alert('Failed to fetch the budget. Please try again later.');
      }
    );
  }

  initializeForm(): void {
    // Initialize the form with necessary validators
    this.budgetForm = this.formBuilder.group({
      projetId: ['', Validators.required], // Project ID
      allocatedFunds: ['', [Validators.required, Validators.min(0)]], // Allocated funds with min value check
      usedFunds: ['', [Validators.required, Validators.min(0)]] // Used funds with min value check
    });
  }

  onSubmit(): void {
    if (this.budgetForm.invalid) {
      return; // If the form is invalid, do nothing
    }
    
    const updatedBudget = this.budgetForm.value;
    // Update the project budget with the form data
    this.budgetService.updateProjectBudget(this.budgetId, updatedBudget).subscribe(
      () => {
        console.log('Project budget updated successfully');
        alert('Project budget updated successfully');
        // Redirect to the project budget list page
        this.router.navigate(['admin/project-budget']);
      },
      (error) => {
        console.error('Error updating the project budget', error);
        alert('Failed to update the project budget. Please try again later.');
      }
    );
  }
}

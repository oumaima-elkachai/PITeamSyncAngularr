import { Component } from '@angular/core';
import { BudgetPredictionService } from 'src/app/core/services/project-budget/budget-prediction.service';
import { ProjectBudgetService } from 'src/app/core/services/project-budget/project-budget.service';


@Component({
  selector: 'app-budget-prediction',
  templateUrl: './budget-prediction.component.html',
  styleUrls: ['./budget-prediction.component.css']
})
export class BudgetPredictionComponent {

  allocatedFunds: number ;
  usedFunds: number ;  
  predictionResult: string = '';
  errorMessage: string = '';

  constructor(
    private budgetPredictionService: ProjectBudgetService) {
    this.allocatedFunds = 0;
    this.usedFunds = 0;
  }
  

  // Méthode pour envoyer les données au backend
  predictBudget() {
    const data = {
      allocatedFunds: this.allocatedFunds,
      usedFunds: this.usedFunds
    };
    console.log('Données envoyées:', data); // Vérifie les données
  
    this.budgetPredictionService.getBudgetScore(data).subscribe(
      response => {
        console.log('Réponse de l\'API:', response); // Vérifie la réponse
        this.predictionResult = `Budget Score: ${response.budget_score}`;
        this.errorMessage = ''; // Réinitialiser l'erreur
      },
      error => {
        this.errorMessage = `Erreur: ${error.error.message}`;
        this.predictionResult = ''; // Réinitialiser la prédiction
      }
    );
  }
  
      
}
  

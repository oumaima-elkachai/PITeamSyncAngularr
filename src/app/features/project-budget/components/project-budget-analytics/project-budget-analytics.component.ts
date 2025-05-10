import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';  // Use this import instead
import { ProjectBudgetService } from 'src/app/core/services/project-budget/project-budget.service';


@Component({
  selector: 'app-project-budget-analytics',
  templateUrl: './project-budget-analytics.component.html',
  styleUrls: ['./project-budget-analytics.component.css']
})
export class ProjectBudgetAnalyticsComponent implements OnInit {
  projectBudgets: any[] = [];

  constructor(private projectBudgetService: ProjectBudgetService) {}

  ngOnInit(): void {
    this.projectBudgetService.getAllProjectBudgets().subscribe((data: any[]) => {
      this.projectBudgets = data;
      setTimeout(() => this.initCharts(), 100);
    });
  }
  

  initCharts() {
    this.projectBudgets.forEach((budget, index) => {
      const canvasId = `gaugeChart-${index}`;
      const usedPercent = Math.min((budget.usedFunds / budget.allocatedFunds) * 100, 100);
      const remaining = 100 - usedPercent;
  
      const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
      if (!canvas) return;
  
      // Forcer la taille du canvas (pour que Chart.js n'agrandisse pas tout)
      canvas.width = 200;
      canvas.height = 200;
  
      new Chart(canvas, {
        type: 'doughnut',
        data: {
          labels: ['Utilisé', 'Restant'],
          datasets: [{
            data: [usedPercent, remaining],
            backgroundColor: [
              usedPercent > 90 ? 'red' :
              usedPercent > 70 ? 'orange' : 'green',
              '#e0e0e0'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: false, // on désactive pour maîtriser la taille
          maintainAspectRatio: false,
          cutout: '70%',
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => `${context.label}: ${context.parsed.toFixed(1)}%`
              }
            }
          }
        }
      });
    });
  }
  
}

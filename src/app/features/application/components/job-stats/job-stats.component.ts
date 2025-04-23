import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { ApplicationService } from 'src/app/core/services/job-apply/application.service';

@Component({
  selector: 'app-job-stats',
  templateUrl: './job-stats.component.html',
  styleUrls: ['./job-stats.component.css']
})
export class JobStatsComponent implements OnInit {
  public doughnutChartLabels: string[] = [];
  
  public doughnutChartData: number[] = [];

  public doughnutChartType: 'doughnut' = 'doughnut'; // ✅ ici, on spécifie le type statiquement

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#333',
          font: {
            size: 14,
            family: "'Segoe UI', sans-serif"
          }
        }
      }
    }
  };

  public doughnutChartColors = [
    {
      backgroundColor: [
        '#4e73df',
        '#1cc88a',
        '#36b9cc',
        '#f6c23e',
        '#e74a3b',
        '#858796',
        '#20c9a6',
        '#6f42c1'
      ],
      borderWidth: 2,
      borderColor: '#fff'
    }
  ];


  
  constructor(private appService: ApplicationService) {}

  ngOnInit(): void {
    this.appService.getApplicationsCountByJob().subscribe((data) => {
      this.doughnutChartLabels = Object.keys(data);
      this.doughnutChartData = Object.values(data);
    });
  }
}

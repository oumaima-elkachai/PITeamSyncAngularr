import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/core/services/payment/payment.service';
import { AnomalyDetectionService } from 'src/app/core/services/anomaly-detection/anomaly-detection.service';
import { Payment } from 'src/app/features/payment/models/payment.model';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-payment-charts',
  templateUrl: './payment-charts.component.html',
  styleUrls: ['./payment-charts.component.css']
})
export class PaymentChartsComponent implements OnInit {
  payments: any[] = [];
  anomalies: any[] = [];
  months: string[] = [];
  paymentAmounts: number[] = [];
  salaryEvolutionMonths: string[] = [];
  salaryEvolutionData: number[] = [];

  constructor(
    private paymentService: PaymentService,
    private anomalyService: AnomalyDetectionService
  ) {}

  ngOnInit(): void {
    // Récupérer les paiements depuis le backend
    this.paymentService.getAllPayments().subscribe((payments) => {
      this.payments = payments;
      
      // Calculer les paiements par mois
      this.calculatePaymentStatistics();
      // Calculer l'évolution des salaires
      this.calculateSalaryEvolution();
      
      // Détecter les anomalies après avoir récupéré les paiements
      this.loadPaymentsAndDetectAnomalies();
    });
  }

  // Calcul des paiements par mois
  calculatePaymentStatistics() {
    const paymentsByMonth: { [key: string]: number } = {};

    this.payments.forEach(payment => {
      const month = new Date(payment.paymentDate).toLocaleString('default', { month: 'long' });
      paymentsByMonth[month] = (paymentsByMonth[month] || 0) + payment.amount;
    });

    this.months = Object.keys(paymentsByMonth);
    this.paymentAmounts = Object.values(paymentsByMonth);

    // Créer le graphique des paiements par mois
    this.createGroupedStackedBarChart();
  }

  // Calcul de l'évolution des salaires
  calculateSalaryEvolution() {
    const salaryByMonth: { [key: string]: number } = {};

    this.payments.forEach(payment => {
      const month = new Date(payment.paymentDate).toLocaleString('default', { month: 'long' });
      salaryByMonth[month] = (salaryByMonth[month] || 0) + payment.amount;
    });

    this.salaryEvolutionMonths = Object.keys(salaryByMonth);
    this.salaryEvolutionData = Object.values(salaryByMonth);

    // Créer le graphique de l'évolution des salaires
    this.createGradientLineChart();
  }

  // Fonction pour détecter les anomalies
  loadPaymentsAndDetectAnomalies(): void {
    const formattedPayments = this.payments.map(p => ({
      employeeId: p.employeeId,
      referenceNumber: p.referenceNumber,
      amount: p.amount,
      month: new Date(p.paymentDate).toISOString().slice(0, 7) // format "YYYY-MM"
    }));

    this.anomalyService.detectAnomalies(formattedPayments).subscribe(
      (response) => {
        this.anomalies = response;
        console.log('Anomalies détectées:', this.anomalies);
      },
      (error) => {
        console.error('Erreur lors de la détection des anomalies:', error);
      }
    );
  }

  // Fonction pour créer un graphique bar empilé groupé
  createGroupedStackedBarChart() {
    new Chart('barChart', {
      type: 'bar',
      data: {
        labels: this.months,
        datasets: [{
          label: 'Paiements par mois',
          data: this.paymentAmounts,
          backgroundColor: 'rgba(0, 123, 255, 0.6)', // Couleur des barres
          borderColor: 'rgba(0, 123, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            position: 'top',
          }
        }
      }
    });
  }

  // Fonction pour créer un graphique linéaire avec dégradé
  createGradientLineChart() {
    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
    const gradient = ctx.getContext('2d')!.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(255, 99, 132, 1)');
    gradient.addColorStop(1, 'rgba(255, 99, 132, 0.2)');

    new Chart('lineChart', {
      type: 'line',
      data: {
        labels: this.salaryEvolutionMonths,
        datasets: [{
          label: 'Évolution des salaires',
          data: this.salaryEvolutionData,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: gradient,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}

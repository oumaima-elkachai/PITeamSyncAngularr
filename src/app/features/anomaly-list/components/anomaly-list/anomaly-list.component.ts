import { Component, OnInit } from '@angular/core';
import { AnomalyDetectionService } from 'src/app/core/services/anomaly-detection/anomaly-detection.service';
import { PaymentService } from 'src/app/core/services/payment/payment.service';
import { Payment } from 'src/app/features/payment/models/payment.model';

@Component({
  selector: 'app-anomaly-list',
  templateUrl: './anomaly-list.component.html',
  styleUrls: ['./anomaly-list.component.css']
})
export class AnomalyListComponent implements OnInit {
  anomalies: any[] = [];
  allPayments: Payment[] = [];

  constructor(
    private anomalyService: AnomalyDetectionService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.loadPaymentsAndDetectAnomalies();
  }

  loadPaymentsAndDetectAnomalies(): void {
    this.paymentService.getAllPayments().subscribe(
      (payments) => {
        this.allPayments = payments;

        // Adapter les données pour l'API Python (champs nécessaires seulement)
        const formattedPayments = this.allPayments.map(p => ({
          employeeId: p.employeeId,
          referenceNumber: p.referenceNumber,  // Change this to referenceNumber
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
      },
      (error) => {
        console.error('Erreur lors du chargement des paiements:', error);
      }
    );
  }
}

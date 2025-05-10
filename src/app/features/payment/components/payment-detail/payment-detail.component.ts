import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from 'src/app/core/services/payment/payment.service';
import { Payment } from '../../models/payment.model';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css']
})
export class PaymentDetailComponent implements OnInit {
  selectedPayment!: Payment;

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.paymentService.getPaymentById(id).subscribe(payment => {
        console.log(payment);  // Vérifier la structure de payment
        this.selectedPayment = payment;
      });
    }
  }
  
}

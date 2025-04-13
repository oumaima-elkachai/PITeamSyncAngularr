import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/core/services/payment/payment.service';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment } from 'src/app/features/payment/models/payment.model';
import { Employee } from 'src/app/features/employee/models/employee.model';

enum PaymentMethod {
  PAYPAL = 'PAYPAL',
  CASH = 'CASH',
  CHECK = 'CHECK',
  STRIPE = 'STRIPE',
  VIREMENT = 'VIREMENT',
  BANK = 'BANK'
}

enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED'
}

enum RecurrenceFrequency {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  BIWEEKLY = 'BIWEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY'
}

@Component({
  selector: 'app-payment-edit',
  templateUrl: './payment-edit.component.html',
  styleUrls: ['./payment-edit.component.css']
})
export class PaymentEditComponent implements OnInit {
  paymentForm!: FormGroup;
  employees: Employee[] = [];
  paymentMethods = Object.values(PaymentMethod);
  paymentStatuses = Object.values(PaymentStatus);
  recurrenceFrequencies = Object.values(RecurrenceFrequency);
  payment: Payment | null = null;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.fetchEmployees();
    this.loadPaymentData();
  }
  
  get f() {
    return this.paymentForm.controls;
  }

  initForm(): void {
    this.paymentForm = this.fb.group({
      employeeId: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      status: ['', Validators.required],
      description: [''],
      isRecurring: [false],
      recurrenceFrequency: ['']
    });
  }
  

  fetchEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => this.employees = data,
      error: () => this.errorMessage = "Erreur de chargement des employés"
    });
  }

  loadPaymentData(): void {
    const paymentId = this.route.snapshot.paramMap.get('id');
    if (paymentId) {
      this.paymentService.getPaymentById(paymentId).subscribe({
        next: (data) => {
          this.payment = data;
          this.paymentForm.patchValue({
            employeeId: data.employeeId,
            paymentMethod: data.paymentMethod,
            status: data.status,
            description: data.description,
            isRecurring: data.isRecurring,
            recurrenceFrequency: data.recurrenceFrequency
          });
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = "Erreur lors du chargement du paiement.";
        }
      });
    }
  }

  onSubmit(): void {
    if (this.paymentForm.invalid) return;
  
    this.loading = true;
    const updatedPayment = { ...this.paymentForm.value };
  
    // Don't change the reference number, amount, or payment date
    updatedPayment.referenceNumber = this.payment?.referenceNumber; // Keep existing reference number
    updatedPayment.amount = this.payment?.amount; // Keep existing amount
    updatedPayment.paymentDate = this.payment?.paymentDate; // Keep existing payment date
  
    if (!updatedPayment.isRecurring) {
      updatedPayment.recurrenceFrequency = null;
    }
  
    if (this.payment) {
      this.paymentService.updatePayment(this.payment.id, updatedPayment).subscribe({
        next: () => {
          this.successMessage = 'Paiement mis à jour avec succès !';
          
          // Navigate to the same route but with a new query parameter to force reload of the component
          this.router.navigate(['/admin/payments'], { queryParams: { refresh: new Date().getTime() }});
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = "Erreur lors de la mise à jour du paiement.";
        },
        complete: () => this.loading = false
      });
    }
  }
  
  
  
}

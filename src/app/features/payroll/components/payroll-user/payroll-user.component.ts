import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from 'src/app/core/services/payment/payment.service';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { PayrollService } from 'src/app/core/services/payroll/payroll.service';
import { Payment } from 'src/app/features/payment/models/payment.model';
import { Employee } from 'src/app/features/employee/models/employee.model';
import { Payroll } from '../../models/payroll.model';
import * as html2pdf from 'html2pdf.js';


@Component({
  selector: 'app-payroll-user',
  templateUrl: './payroll-user.component.html',
  styleUrls: ['./payroll-user.component.css']
})
export class PayrollUserComponent implements OnInit {
  selectedPayment!: Payment;
  selectedE!: Employee;
  payrollE!: Payroll;

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private employeeService: EmployeeService,
    private payrollService: PayrollService
  ) {}

  ngOnInit(): void {
    const id = '67f670b0d487496b23ef7652'; // ID du paiement à afficher
  
    if (id) {
      this.paymentService.getPaymentById(id).subscribe(payment => {
        this.selectedPayment = payment;
  
        // Récupérer l'employé
        this.employeeService.getEmployeeById(payment.employeeId).subscribe(employee => {
          this.selectedE = employee;
        });
  
        // Récupérer le payroll lié à ce paiement (via payment.payrollId)
        if (payment.payrollId) {
          this.payrollService.getPayrollById(payment.payrollId).subscribe(payroll => {
            console.log('Payroll reçu :', payroll);
            this.payrollE = payroll;
          }, error => {
            console.error('Erreur lors de la récupération du payroll :', error);
          });
        } else {
          console.warn('payment.payrollId est undefined ou vide');
        }
      });
    }
  }
  downloadPDF(): void {
    setTimeout(() => {
      const element = document.getElementById('fiche-paie');
  
      if (element) {
        const options = {
          filename: `fiche-paie-${this.selectedPayment.referenceNumber}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
  
        html2pdf().set(options).from(element).save();
      }
    }, 300); // attends 300ms pour s'assurer que le DOM est prêt
    
  }
  
  
  
  }


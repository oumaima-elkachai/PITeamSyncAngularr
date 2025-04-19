import { Component } from '@angular/core';
import { Employee } from 'src/app/features/employee/models/employee.model';
import { Payroll } from 'src/app/features/payroll/models/payroll.model';
import { Payment } from 'src/app/features/payment/models/payment.model';

import { PayrollService } from 'src/app/core/services/payroll/payroll.service';
import { PaymentService } from 'src/app/core/services/payment/payment.service';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  employeeId: string = '67f091e0a15fb50ce3b5d81e';
  selectedDate: string = '';
  selectedOption: string = 'payroll';
  result: any;

  selectedPayment!: Payment;
  selectedE!: Employee;
  payrollE!: Payroll;

  constructor(
    private payrollService: PayrollService,
    private paymentService: PaymentService,
    private employeeService: EmployeeService
  ) {}

  fetchData(): void {
    if (!this.employeeId || !this.selectedDate) return;

    const formattedDate = this.selectedDate;

    if (this.selectedOption === 'payroll') {
      this.paymentService.getPaymentsByEmployee(this.employeeId).subscribe(payments => {
        const matchedPayment = payments.find(p => p.paymentDate?.startsWith(formattedDate));
        if (matchedPayment) {
          this.selectedPayment = matchedPayment;

          this.employeeService.getEmployeeById(this.employeeId).subscribe(emp => {
            this.selectedE = emp;
          });

          if (matchedPayment.payrollId) {
            this.payrollService.getPayrollById(matchedPayment.payrollId).subscribe(payroll => {
              this.payrollE = payroll;
              this.result = 'payroll'; // déclenche l'affichage
            });
          }
        } else {
          this.result = null;
          alert("Aucun paiement trouvé pour cette date.");
        }
      });

    } else if (this.selectedOption === 'details') {
      this.paymentService.getPaymentsByEmployee(this.employeeId).subscribe(payments => {
        const matched = payments.find(p => p.paymentDate?.startsWith(formattedDate));
        if (matched?.payrollId) {
          this.payrollService.getPayrollById(matched.payrollId).subscribe(payroll => {
            this.result = payroll;
          });
        } else {
          this.result = null;
          alert("Aucun paiement trouvé pour cette date.");
        }
      });

    } else if (this.selectedOption === 'status') {
      this.paymentService.getPaymentStatus(this.employeeId, formattedDate).subscribe(status => {
        this.result = status;
      });
    } else {
      this.result = null;
      alert("Aucun paiement trouvé pour cette date.");
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
    }, 300);
  }
}

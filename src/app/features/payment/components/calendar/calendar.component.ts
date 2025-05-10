import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/features/employee/models/employee.model';
import { Payroll } from 'src/app/features/payroll/models/payroll.model';
import { Payment } from 'src/app/features/payment/models/payment.model';

import { PayrollService } from 'src/app/core/services/payroll/payroll.service';
import { PaymentService } from 'src/app/core/services/payment/payment.service';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Swal from 'sweetalert2';
import * as html2pdf from 'html2pdf.js';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  employeeId: string = '67f091e0a15fb50ce3b5d81e';
  selectedDate: string = '';
  selectedOption: string = 'payroll';
  selectedPayroll!: Payroll;
  predictedStatus!: number;
  result: any;

  selectedPayment!: Payment;
  selectedE!: Employee;
  payrollE!: Payroll;

  calendarEvents: any[] = []; 
  calendarOptions: any; 
  calendarPlugins = [dayGridPlugin, interactionPlugin];

  constructor(
    private payrollService: PayrollService,
    private paymentService: PaymentService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {

    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin],
      events: this.calendarEvents,
      dateClick: this.handleDateClick.bind(this),
      eventContent: function(arg: any) {
        const lines = arg.event.title.split('\n');
        return {
          html: `
            <div style="
              border: 1px solid #ccc;
              border-radius: 6px;
              padding: 4px;
              background-color: #f8f9fa;
              margin-top: 4px;
              font-size: 11px;
              line-height: 1.4;
              text-align: left;
              box-shadow: 0 0 3px rgba(0,0,0,0.1);
            ">
              <div style="color: #28a745;"><strong>${lines[0]}</strong></div>
              <div style="color: #17a2b8;"><strong>${lines[1]}</strong></div>
            </div>
          `
        };
      }
    };

    this.loadEmployeePayments();
  }

  loadEmployeePayments() {
    this.paymentService.getPaymentsByEmployee(this.employeeId).subscribe(payments => {
      this.calendarEvents = [];

      payments.forEach(payment => {
        if (payment.payrollId) {
          this.payrollService.getPayrollById(payment.payrollId).subscribe(payroll => {
            this.calendarEvents.push({
              title: `Salary: ${payroll.salary} TND\nBonus: ${payroll.bonus} TND`,
              start: new Date(payment.paymentDate),
              id: payment.id
            });

            this.calendarOptions.events = [...this.calendarEvents];
          });
        }
      });
    });
  }

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
              this.result = 'payroll';   
            });
          }
        } else {
          this.result = null;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No payment found for this date.',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6',
          });
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
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No payment found for this date.',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6',
          });
        }
      });

    } else if (this.selectedOption === 'status') {
      this.paymentService.getPaymentStatus(this.employeeId, formattedDate).subscribe(status => {
        this.result = status;
      });

    } else if (this.selectedOption === 'prediction') {
      this.paymentService.getPaymentsByEmployee(this.employeeId).subscribe(payments => {
        const matchedPayment = payments.find(p => p.paymentDate?.startsWith(formattedDate));
        if (matchedPayment && matchedPayment.payrollId) {
          this.payrollService.getPayrollById(matchedPayment.payrollId).subscribe(payroll => {
            this.payrollE = payroll;

            const data = {
              salary: payroll.salary,
              bonus: payroll.bonus,
              previousDelays: 2 // Tu peux calculer ça plus tard à partir de l'historique
            };

            this.paymentService.predictPaymentStatus(data).subscribe(res => {
              this.predictedStatus = Number(res.prediction);
              this.result = 'prediction'; // Affiche la section dans le HTML
            });
          });
        } else {
          this.result = null;
          this.predictedStatus = -1;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No payment found for this date.',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6',
          });
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

  predict() {
    const data = {
      salary: this.payrollE.salary,
      bonus: this.payrollE.bonus,
      previousDelays: 2  // À ajuster selon ton historique
    };

    this.paymentService.predictPaymentStatus(data).subscribe(res => {
      this.predictedStatus = Number(res.prediction);  // Conversion en nombre
    });
  }

  handleDateClick(event: any) {
    this.selectedDate = event.dateStr; // Récupère la date cliquée dans le calendrier
    this.fetchData(); // Charge les données liées à la date sélectionnée
  }
}

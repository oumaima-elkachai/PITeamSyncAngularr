import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Payment } from '../../models/payment.model';
import { PaymentService } from 'src/app/core/services/payment/payment.service';
import { Employee } from 'src/app/features/employee/models/employee.model';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit, AfterViewInit {
  payments: Payment[] = [];
  employees: { [id: string]: Employee } = {};

  constructor(
    private paymentService: PaymentService,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPayments();
  }

  ngAfterViewInit(): void {
    // Delay to make sure payments are loaded before initializing DataTable
    setTimeout(() => {
      $('#paymentsTable').DataTable({
        paging: true,
        searching: true,
        ordering: true,
        language: {
          search: "Search:",
          lengthMenu: "Show _MENU_ entries",
          info: "Showing _START_ to _END_ of _TOTAL_ payments",
          paginate: {
            previous: "Prev",
            next: "Next"
          },
          zeroRecords: "No matching records found",
        }
      });
    }, 500);
  }

  getPayments(): void {
    this.paymentService.getAllPayments().subscribe((data: Payment[]) => {
      this.payments = data;
      this.getEmployeeNames();
    });
  }

  getEmployeeNames(): void {
    const employeeIds = [...new Set(this.payments.map(p => p.employeeId))];
    employeeIds.forEach(id => {
      if (!this.employees[id]) {
        this.employeeService.getEmployeeById(id).subscribe((emp: Employee) => {
          this.employees[id] = emp;
        });
      }
    });
  }

  getEmployeeName(employeeId: string): string {
    return this.employees[employeeId]?.name || 'Name not found';
  }

  onDelete(paymentId: string): void {
    if (confirm('Are you sure you want to delete this payment?')) {
      this.paymentService.deletePayment(paymentId).subscribe(() => {
        this.payments = this.payments.filter(p => p.id !== paymentId);
      });
    }
  }

  onEdit(payment: Payment): void {
    this.router.navigate(['/admin/payments/edit', payment.id]);
  }

  onDetails(payment: Payment): void {
    this.router.navigate(['/admin/payments/details', payment.id]);
  }
  onAddPayment() {
    this.router.navigate(['/admin/payment/add']);
  }
  
}

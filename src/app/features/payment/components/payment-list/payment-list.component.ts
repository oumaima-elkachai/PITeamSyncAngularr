import { Component, OnInit } from '@angular/core';
import { Payment } from '../../models/payment.model';
import { PaymentService } from 'src/app/core/services/payment/payment.service';
import { Employee } from 'src/app/features/employee/models/employee.model';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
  payments: Payment[] = [];
  employees: { [id: string]: Employee } = {};  // Cache for employee names
  

  constructor(
    private paymentService: PaymentService,
    private employeeService: EmployeeService, // Inject EmployeeService
    private router: Router

  ) {}

  ngOnInit(): void {
    this.getPayments();
  }

  getPayments(): void {
    this.paymentService.getAllPayments().subscribe((data: Payment[]) => {
      this.payments = data;
      this.getEmployeeNames(); // Ensure employee names are fetched after payments
    });
  }

  // Fetch employee names based on employeeIds
  getEmployeeNames(): void {
    const employeeIds = [...new Set(this.payments.map(payment => payment.employeeId))];

    employeeIds.forEach(id => {
      if (!this.employees[id]) { // Fetch employee data only if it's not already in the cache
        this.employeeService.getEmployeeById(id).subscribe((employee: Employee) => {
          this.employees[id] = employee;
        });
      }
    });
  }

  // Utility function to get employee name by employeeId
  getEmployeeName(employeeId: string): string {
    const employee = this.employees[employeeId];
    return employee ? employee.name : 'Nom non trouvé';  // Default value if not found
  }

  // Method to handle delete
  onDelete(paymentId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce paiement ?')) {
      this.paymentService.deletePayment(paymentId).subscribe(() => {
        this.payments = this.payments.filter(payment => payment.id !== paymentId);
      });
    }
  }

  // Method to handle edit
  onEdit(payment: Payment): void {
    this.router.navigate(['/admin/payments/edit', payment.id]); 
  }
  // Méthode pour aller vers les détails d’un paiement
  onDetails(payment: Payment): void {
    this.router.navigate(['/admin/payments/details', payment.id]);
  }
}

import { Component, OnInit } from '@angular/core';
import { Payroll } from '../../models/payroll.model';
import { PayrollService } from 'src/app/core/services/payroll/payroll.service';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';  // Importer le service Employee
import { Router } from '@angular/router';

@Component({
  selector: 'app-payroll-list',
  templateUrl: './payroll-list.component.html',
  styleUrls: ['./payroll-list.component.css']
})
export class PayrollListComponent implements OnInit {
  payrolls: Payroll[] = [];
  employeeNames: Map<string, string> = new Map();

  constructor(
    private payrollService: PayrollService,
    private employeeService: EmployeeService,  // Injection du service
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPayrolls();
  }

  loadPayrolls(): void {
    this.payrollService.getAllPayrolls().subscribe(
      (data) => {
        this.payrolls = data;
        console.log('Fiches de paie chargées :', this.payrolls);
        
        this.payrolls.forEach(payroll => {
          if (payroll.employeeId) {
            this.employeeService.getEmployeeById(payroll.employeeId).subscribe(
              (employee) => {
                this.employeeNames.set(payroll.employeeId, employee.name);  // Enregistrer le nom dans le Map
              },
              (error) => {
                console.error('Erreur lors de la récupération du nom de l\'employé', error);
              }
            );
          }
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération des fiches de paie', error);
      }
    );
  }

  getEmployeeName(employeeId: string): string {
    return this.employeeNames.get(employeeId) ?? 'Nom non disponible';
  }

  onEdit(payroll: Payroll): void {
    this.router.navigate([`/admin/payrolls/edit`, payroll.id]);
  }

  onDelete(payrollId: string): void {
    this.payrollService.deletePayroll(payrollId).subscribe(
      () => {
        console.log('Fiche de paie supprimée avec succès');
        this.loadPayrolls();  // Rechargement de la liste après suppression
      },
      (error) => {
        console.error('Erreur lors de la suppression de la fiche de paie', error);
      }
    );
  }
}

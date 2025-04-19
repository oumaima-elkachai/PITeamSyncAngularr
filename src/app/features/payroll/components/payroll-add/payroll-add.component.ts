import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { PayrollService } from 'src/app/core/services/payroll/payroll.service';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { Payroll } from '../../models/payroll.model';
import { Employee } from 'src/app/features/employee/models/employee.model';

@Component({
  selector: 'app-payroll-add',
  templateUrl: './payroll-add.component.html',
  styleUrls: ['./payroll-add.component.css']
})
export class PayrollsAddComponent implements OnInit {
  payroll = {
    employeeId: '',
    employeeName: '',
    salary: 0,
    bonus: 0,
    payDate: ''
  };

  employees: Employee[] = [];
  payrolls: Payroll[] = [];
  message: string = '';

  constructor(
    private payrollService: PayrollService,
    private employeeService: EmployeeService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.loadPayrolls();
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(
      (employees) => {
        this.employees = employees;
        this.cdRef.detectChanges();
      },
      (error) => {
        console.error('Erreur lors du chargement des employés', error);
      }
    );
  }

  loadPayrolls(): void {
    this.payrollService.getAllPayrolls().subscribe(
      (payrolls) => {
        this.payrolls = payrolls;
      },
      (error) => {
        console.error('Erreur lors du chargement des fiches de paie', error);
      }
    );
  }

  onSubmit(): void {
    if (this.payroll.salary <= 0) {
      alert("Le salaire doit être strictement supérieur à 0.");
      return;
    }
  
    if (this.payroll.bonus < 0) {
      alert("Le bonus ne peut pas être négatif.");
      return;
    }
  
    const selectedDate = new Date(this.payroll.payDate);
    const selectedMonth = selectedDate.getMonth();
    const selectedYear = selectedDate.getFullYear();
  
    const duplicatePayroll = this.payrolls.find(p => {
      const existingDate = new Date(p.payDate);
      return (
        p.employeeId === this.payroll.employeeId &&
        existingDate.getMonth() === selectedMonth &&
        existingDate.getFullYear() === selectedYear
      );
    });
  
    if (duplicatePayroll) {
      alert("Cet employé a déjà une fiche de paie pour ce mois.");
      return;
    }
  
    const payrollData: Payroll = {
      employeeId: this.payroll.employeeId,
      employeeName: this.payroll.employeeName,
      salary: this.payroll.salary,
      bonus: this.payroll.bonus,
      payDate: this.payroll.payDate
    };
  
    this.payrollService.addPayroll(payrollData).subscribe(
      response => {
        alert('Fiche de paie ajoutée avec succès !');
        this.loadPayrolls(); // Rafraîchir la liste
        setTimeout(() => {
          this.router.navigate(['/payrolls']);
        }, 1500);
      },
      error => {
        console.error('Erreur lors de l’ajout de la fiche de paie', error);
      }
    );
  }
  
  
}

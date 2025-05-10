import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Payroll } from '../../models/payroll.model';
import { PayrollService } from 'src/app/core/services/payroll/payroll.service';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-payroll-list',
  templateUrl: './payroll-list.component.html',
  styleUrls: ['./payroll-list.component.css']
})
export class PayrollListComponent implements OnInit, AfterViewInit {
  payrolls: Payroll[] = [];
  employeeNames: { [id: string]: string } = {};

  constructor(
    private payrollService: PayrollService,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPayrolls();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      $('#payrollTable').DataTable({
        paging: true,
        searching: true,
        ordering: true,
        language: {
          search: 'Search:',
          lengthMenu: 'Show _MENU_ entries',
          info: 'Showing _START_ to _END_ of _TOTAL_ payrolls',
          paginate: {
            previous: 'Prev',
            next: 'Next'
          },
          zeroRecords: 'No matching records found'
        }
      });
    }, 500);
  }

  loadPayrolls(): void {
    this.payrollService.getAllPayrolls().subscribe(data => {
      this.payrolls = data;
      const uniqueIds = [...new Set(data.map(p => p.employeeId))];
      uniqueIds.forEach(id => {
        this.employeeService.getEmployeeById(id).subscribe(emp => {
          this.employeeNames[id] = emp.name;
        });
      });
    });
  }

  getEmployeeName(id: string): string {
    return this.employeeNames[id] || 'Name not available';
  }

  onEdit(payroll: Payroll): void {
    this.router.navigate(['/admin/payrolls/edit', payroll.id]);
  }

  onDelete(id: string): void {
    if (confirm('Are you sure you want to delete this payroll?')) {
      this.payrollService.deletePayroll(id).subscribe(() => {
        this.payrolls = this.payrolls.filter(p => p.id !== id);
      });
    }
  }

  onAddPayroll(): void {
    this.router.navigate(['/admin/payrolls/add']);
  }
}

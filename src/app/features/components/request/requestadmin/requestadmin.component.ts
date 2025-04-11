import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { RequestService } from 'src/app/core/services/request.service';
import { Employee, Request } from 'src/app/models/presencemodel';

@Component({
  selector: 'app-requestadmin',
  templateUrl: './requestadmin.component.html',
  styleUrls: ['./requestadmin.component.css']
})
export class RequestadminComponent {

  requests: Request[] = [];
  employees: Employee[] = [];

  constructor(
    private requestService: RequestService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.requestService.getAllRequests().subscribe((requests: Request[]) => {
      this.requests = requests;
      this.employeeService.getAllEmployees().subscribe((employees: Employee[]) => {
        this.employees = employees;
        this.mapEmployeesToRequests();
      });
    });
  }

  mapEmployeesToRequests() {
    this.requests = this.requests.map(request => {
      const employee = this.employees.find(emp => emp.id === request.employeeId);
      return { ...request, employee };
    });
  }

  updateStatus(req: Request, newStatus: 'APPROVED' | 'REJECTED') {
    this.requestService.updateStatus(req.id!, newStatus).subscribe({
      next: () => {
        req.status = newStatus;
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour :', err);
      }
    });
  }

}

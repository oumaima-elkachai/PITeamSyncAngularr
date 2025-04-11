import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  Presence } from 'src/app/models/presencemodel';
import { PresenceService } from 'src/app/core/services/presence.service';
import { EmployeeService } from 'src/app/core/services/employee.service';


@Component({
  selector: 'app-presence-list',
  templateUrl: './presence-list.component.html',
  styleUrls: ['./presence-list.component.css']
})
export class PresenceListComponent implements OnInit{

  presences: any[] = [];
  employees: any[] = [];



  constructor(
    private presenceService: PresenceService,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.loadPresences();
  }

loadEmployees() {
  this.employeeService.getAllEmployees().subscribe({
    next: (data) => this.employees = data,
    error: (err) => console.error(err)
  });
}




// Méthode pour récupérer le nom
getEmployeeName(employeeId: string): string {
  const employee = this.employees.find(e => e.id === employeeId);
  return employee ? employee.name : 'Employé inconnu';
}



  loadPresences(): void {
    this.presenceService.getAllPresences().subscribe({
        next: (data) => {
            this.presences = data;
            console.log('Présences chargées:', data); // Pour debug
        },
        error: (err) => console.error('Erreur de chargement des présences', err)
    });
}

  onEdit(presence: Presence): void {
    this.router.navigate(['admin/attendances/edit', presence.id]);

  }

  onDelete(id: string): void {
    this.presenceService.deletePresence(id).subscribe({
      next: () => this.loadPresences(),
      error: (err) => console.error('Erreur suppression présence', err)
    });
  }

  
  

}



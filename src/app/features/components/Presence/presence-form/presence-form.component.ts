import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { PresenceService } from 'src/app/core/services/presence.service';
import { Presence } from 'src/app/models/presencemodel';

@Component({
  selector: 'app-presence-form',
  templateUrl: './presence-form.component.html',
  styleUrls: ['./presence-form.component.css']
})
export class PresenceFormComponent implements OnInit {

    presence: Presence = {
      employeeId: '',
      date: '',
      checkInTime: '',
      checkOutTime: '',
      hoursWorked: 0,
      overtimeHours: 0
    };
  
    isEditMode = false;
    id: string | null = null;
  
    
  
    employees: any[] = [];

constructor(
  private presenceService: PresenceService,
  private employeeService: EmployeeService,
  private route: ActivatedRoute,
  private router: Router
) {}

ngOnInit(): void {
  this.employeeService.getAllEmployees().subscribe(data => {
    this.employees = data;
  });

  this.id = this.route.snapshot.paramMap.get('id');
  if (this.id) {
    this.isEditMode = true;
    this.presenceService.getPresenceById(this.id).subscribe((data) => {
      this.presence = {
        employeeId: data.employeeId,
        date: data.date,
        checkInTime: data.checkInTime,
        checkOutTime: data.checkOutTime,
        hoursWorked: data.hoursWorked,
        overtimeHours: data.overtimeHours,
      };
    });
  }
}

  
    onSubmit(): void {
      if (this.isEditMode && this.id) {
        this.presenceService.updatePresence(this.id, this.presence).subscribe(() => {
          this.router.navigate(['/admin/presence']);

        });
      } else {
        this.presenceService.savePresence(this.presence).subscribe(() => {
          this.router.navigate(['/admin/attendances']);
        });
      }
    }
  }
  



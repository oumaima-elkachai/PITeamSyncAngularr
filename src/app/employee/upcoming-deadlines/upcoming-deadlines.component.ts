import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-upcoming-deadlines',
  templateUrl: './upcoming-deadlines.component.html',
  styleUrls: ['./upcoming-deadlines.component.css']
})
export class UpcomingDeadlinesComponent implements OnInit {
  tasks: Task[] = [];
  isLoading = true;
  daysAhead = 7;
  currentEmployeeId = '67fd82fe2d7dc679a06c1aca'; // Replace with auth service later

  constructor(
    private employeeService: EmployeeService,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe(); // Load projects
    this.loadDeadlines();
  }

  getProjectName(projectId: string): string {
    const project = this.projectService.getProjectSync(projectId); // You'll need to add this method
    return project ? project.title : 'Unknown Project';
  }

  getDaysLeft(deadline: string | Date): number {
    const deadlineDate = typeof deadline === 'string' ? new Date(deadline) : deadline;
    const diff = deadlineDate.getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / (1000 * 3600 * 24)));
  }


  loadDeadlines(): void {
    this.employeeService
      .getUpcomingDeadlines(this.currentEmployeeId, this.daysAhead)
      .subscribe({
        next: (tasks) => {
          this.tasks = tasks.sort((a, b) =>
            new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
          );
          this.isLoading = false;
        },
        error: () => this.isLoading = false
      });
  }

  
}
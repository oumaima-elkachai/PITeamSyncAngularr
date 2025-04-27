import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Task, TaskStatus } from 'src/app/models/task.model';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  isLoading = true;
  
  // Update the statusFilter declaration
  statusFilter: TaskStatus | 'ALL' = 'ALL' as TaskStatus | 'ALL'; currentEmployeeId = '680b9de4dace5fa9cc248d33'; // Replace with real ID later

  constructor(
    private employeeService: EmployeeService,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  getProjectName(projectId: string): string {
    // You might need to fetch project names from a service
    return 'Project ' + projectId.substring(0, 5); // Temporary implementation
  }
  
  private loadTasks(): void {
    this.employeeService.getEmployeeAssignedTasks(this.currentEmployeeId).subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks;
        this.filterTasks();
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error loading tasks:', err);
        this.isLoading = false;
      }
    });
  }

  // Change the filterTasks method
  filterTasks(status?: TaskStatus | 'ALL'): void {
    this.statusFilter = status || this.statusFilter;
    this.filteredTasks = this.statusFilter === 'ALL'
      ? this.tasks
      : this.tasks.filter(t => t.status === this.statusFilter);
  }

  // Update the status change handler
  updateTaskStatus(taskId: string, newStatus: TaskStatus): void {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.status = newStatus;
      this.taskService.updateTask(taskId, task).subscribe({
        error: (err) => console.error('Error updating task:', err)
      });
    }
  }
}
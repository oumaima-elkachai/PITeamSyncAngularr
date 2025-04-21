import { Component, OnInit } from '@angular/core';
import { Task, TaskStatus } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  loading = true;
  error = false;

  // For filtering
  statusFilter: TaskStatus | null = null;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    // Assuming you'll need to get tasks for the logged-in employee
    // You might need to use an AuthService to get the current user ID
    const employeeId = 'current-employee-id'; // Replace with actual logic

    this.taskService.getEmployeeTasks(employeeId).subscribe({
      next: (data: Task[]) => {
        this.tasks = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading tasks', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  filterByStatus(status: TaskStatus | null): void {
    this.statusFilter = status;
    // Implementation would depend on whether you filter on client or server side
  }

  get filteredTasks(): Task[] {
    if (!this.statusFilter) return this.tasks;
    return this.tasks.filter(task => task.status === this.statusFilter);
  }
}

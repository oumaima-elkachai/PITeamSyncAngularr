import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task, TaskPriority, TaskStatus } from '../../models/task.model';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  taskForm: FormGroup;
  taskId!: string;
  allEmployees: Employee[] = [];
    filteredEmployees: Employee[] = [];
  projectId!: string;
  employees: any[] = [];
  skills: string[] = [];
  isLoading = true;

  priorities = Object.values(TaskPriority);
  statuses   = Object.values(TaskStatus);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public  router: Router,
    private taskService: TaskService,
    private employeeService: EmployeeService
  ) {
    // add requiredSkills form control (as an array)
    this.taskForm = this.fb.group({
      title:          [''],
      description:    [''],
      deadline:       [''],
      priority:       [TaskPriority.MEDIUM],
      status:         [TaskStatus.TODO],
      employeeId:     [''],
      requiredSkills: [[]]         // ← NEW
    });
  }

  ngOnInit(): void {
    this.taskId    = this.route.snapshot.params['taskId'];
    this.projectId = this.route.snapshot.params['projectId'];

    // load the pick-list of skills
    this.taskService.getSkills().subscribe(list => this.skills = list);

    this.loadTask();
    this.loadEmployees();
  }

  private loadTask(): void {
    this.taskService.getTaskById(this.taskId).subscribe({
      next: (task) => {
        this.taskForm.patchValue({
          title:          task.title,
          description:    task.description,
          deadline:       new Date(task.deadline).toISOString().split('T')[0],
          priority:       task.priority,
          status:         task.status,
          employeeId:     task.employeeId || '',
          requiredSkills: task.requiredSkills || []   // ← NEW
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading task:', err);
        this.router.navigate(['/projects', this.projectId]);
      }
    });
  }

  private loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(employees => {
      this.employees = employees;
    });
  }

  onSubmit(): void {
    if (!this.taskForm.valid) return;

    const form = this.taskForm.value;
    const updatedTask: Task = {
      id:              this.taskId,
      projectId:       this.projectId,
      title:           form.title,
      description:     form.description,
      deadline:        new Date(form.deadline).toISOString(),
      priority:        form.priority,
      status:          form.status,
      employeeId:      form.employeeId,
      requiredSkills:  form.requiredSkills  // ← include skills array
    };

    this.taskService.updateTask(this.taskId, updatedTask).subscribe({
      next: () => this.router.navigate(['/projectsadmin', this.projectId]),
      error: (err) => console.error('Error updating task:', err)
    });
  }

  onSkillToggle(skill: string, checked: boolean) {
    const ctrl = this.taskForm.get('requiredSkills')!;
    const current: string[] = ctrl.value || [];
  
    if (checked) {
      // add if missing
      if (!current.includes(skill)) {
        ctrl.setValue([...current, skill]);
      }
    } else {
      // remove
      ctrl.setValue(current.filter(s => s !== skill));
    }
    
    // mark dirty/validate
    ctrl.markAsDirty();
    ctrl.updateValueAndValidity();
  }


}

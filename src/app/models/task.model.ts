export enum TaskPriority {
    HIGH = 'HIGH',
    MEDIUM = 'MEDIUM',
    LOW = 'LOW'
  }
  
  export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
  }
  
  export interface Task {
    id?: string;
    projectId: string;
    title: string;
    description: string;
    deadline: Date | string;
    priority: TaskPriority;  // Changed to use enum
    status: TaskStatus;      // Changed to use enum
    employeeId?: string;
  }
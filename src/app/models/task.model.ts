export interface Task {
    id?: string;
    projectId: string;
    title: string;
    description: string;
    deadline: Date | string;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
    employeeId?: string;
  }
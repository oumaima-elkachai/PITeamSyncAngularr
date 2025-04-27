import { Attachment } from './attachment.model';
export enum TaskSkill {
  FRONTEND = 'Frontend Development',
  BACKEND = 'Backend Development',
  DESIGN = 'UI/UX Design',
  MARKETING = 'Digital Marketing',
  ANALYSIS = 'Data Analysis',
  TESTING = 'Quality Assurance'
}

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
  requiredSkills: TaskSkill[]; // New field

  priority: TaskPriority;  // Changed to use enum
  status: TaskStatus;      // Changed to use enum
  employeeId?: string;
  attachments?: Attachment[]; // Add this

  links?: Array<{
    url: string;
    description?: string;
    createdBy: string;
    createdAt: string;
  }>;


  extensionStatus?: 'PENDING' | 'APPROVED' | 'REJECTED';
  requestedExtensionDate?: Date | string;

}


export interface Project {
    id: string;
    title: string;
    description: string;
    owner: string;
    department: ProjectDepartment; // New field
    dueDate: Date | string;
    status: 'Active' | 'On Hold' | 'Completed';
    type: string;
    taskIds?: string[];
    teamMemberIds?: string[];
  }

  export enum ProjectDepartment {
    ENGINEERING = 'Engineering',
    MARKETING = 'Marketing',
    HR = 'Human Resources'
  }
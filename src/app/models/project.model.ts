export interface Project {
    id: string;
    title: string;
    description: string;
    owner: string;
    dueDate: Date | string;
    status: 'Active' | 'On Hold' | 'Completed';
    type: string;
    taskIds?: string[];
    teamMemberIds?: string[];
  }
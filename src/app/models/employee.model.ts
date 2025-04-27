import { TaskSkill } from "./task.model";

export interface Employee {
    id?: string;
    name: string;
    email: string;
    position: string;
    department: string;
    assignedTaskIds?: string[];
    projectIds?: string[];
    skills?: TaskSkill[];

  }
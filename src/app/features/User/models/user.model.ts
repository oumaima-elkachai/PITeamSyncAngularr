export enum RolesUser {
    ADMIN = 'ADMIN',
    EMPLOYEE = 'EMPLOYEE',
    CANDIDATE = 'CANDIDATE'
  }
  
  export interface User {
    id?: string;
    name: string;
    email: string;
    password: string;
    role: RolesUser;  
    status?: string;
    telephone?: string; 
    photoUrl?: string;   
    resetToken?: string;
    linkedIn?: string; 
    github?: string; 
    portfolio?: string;
    job?: string;
    hireDate?: Date;
  }
  
  
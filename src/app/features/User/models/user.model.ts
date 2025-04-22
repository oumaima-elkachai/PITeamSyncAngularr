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
    telephone?: string;  // New attribute for telephone number
    photoUrl?: string;   // New attribute for photo URL
    resetToken?: string;
  }
  
  
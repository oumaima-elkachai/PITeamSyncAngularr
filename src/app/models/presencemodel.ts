export interface Presence {
  id?: string;
  employeeId: string;
  date: string;  // Changé de string à Date
  checkInTime: string;
  checkOutTime: string;
  hoursWorked: number;
  overtimeHours: number;  // Changé de string à number
  employeeName?: string;
}
export interface Employee {
  id: string;
  name: string;
  department: string;
  role: string;
}

export interface Request {
  id?: string;
  employeeId: string;
  employee?: Employee; // ajouter cette ligne
  type: string;
  startDate: string;
  endDate: string;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
  justification: string;
}



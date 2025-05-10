import { Employee } from "../../employee/models/employee.model";
import { Payroll } from "../../payroll/models/payroll.model";

export interface Payment {
items: any;
 id: string;
 employeeId: string;
 payrollId: string;
 amount: number;
 paymentDate: string;
 description: string;
 isRecurring: boolean;
 recurrenceFrequency: string; // Exemple: 'MONTHLY', 'WEEKLY', etc.
 status: string;  // Exemple: 'COMPLETED', 'PENDING', etc.
 paymentMethod: string;  // Exemple: 'CREDIT_CARD', 'BANK_TRANSFER', etc.
 referenceNumber: string;
 
 //****
 employee :Employee
 payroll : Payroll
}

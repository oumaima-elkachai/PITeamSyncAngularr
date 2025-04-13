import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from 'src/app/features/payment/models/payment.model';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://localhost:8082/api/payments'; // URL Backend Spring Boot
  constructor(private http: HttpClient) { }

  // Get all payments
  getAllPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.apiUrl);
  }

  // Get payments by employee ID
  getPaymentsByEmployeeId(employeeId: string): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/employee/${employeeId}`);
  }

  // Get payment by ID
  getPaymentById(id: string): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}/${id}`);
  }

  // Create a new payment
  createPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.apiUrl, payment);
  }

  // Update an existing payment
  updatePayment(id: string, payment: Payment): Observable<Payment> {
    return this.http.put<Payment>(`${this.apiUrl}/${id}`, payment);
  }
  
  // Delete a payment
  deletePayment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getPaymentsByEmployee(employeeId: string) {
    return this.http.get<any[]>(`${this.apiUrl}/employee/${employeeId}`);
  }
  

}

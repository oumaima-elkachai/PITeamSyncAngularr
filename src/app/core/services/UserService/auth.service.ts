import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from 'src/app/features/User/models/user.model'; // Import the User model
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials, { withCredentials: true }).pipe(
      tap((response: any) => {
        console.log('Login successful', response);
        if(response.user) {
          localStorage.setItem('loggedInUser', JSON.stringify(response.user));
          this.http.get('http://localhost:8080/api/users/session-check', { withCredentials: true }).subscribe(console.log);

        }
      })
    );
  }
  
  deleteUserById(id: string) {
    return this.http.delete(`http://localhost:8080/api/users/delete/${id}`);
  }
  
  updateUserWithPhoto(userId: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${userId}`, formData);
  }
  

  unblockUser(userId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/unblock/${userId}`, {}, {
      withCredentials: true,
      responseType: 'text'
    });
  }
  
   
  
  updateUser(user: User): Observable<any> {
    // Calls the backend endpoint: /api/users/update/{id}
    return this.http.put(`${this.baseUrl}/update/${user.id}`, user, { withCredentials: true });
  }
  

  signup(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, formData, { withCredentials: true });
  }

  logout(): Observable<any> {
    // Optionally, call a backend endpoint to invalidate the session.
    // For example, if you have a /logout endpoint:
    return this.http.post(`${this.baseUrl}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        // Clear any client-side authentication data.
        localStorage.removeItem('loggedInUser');
        // Navigate to the login page.
        this.router.navigate(['/login']);
      })
    );
  }

  // Alternatively, if you don't have a backend logout endpoint, simply do:
  logoutClientSide(): void {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }
  isAuthenticated(): boolean {
    return !!localStorage.getItem('loggedInUser');
  }
  
  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/me`, { withCredentials: true });
  }
  
  getLoggedInUser() {
    return JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  }

  // In auth.service.ts
 /* getCurrentUser(): Observable<any> {
    const token = localStorage.getItem('authToken');  // Ensure token is stored
    if (!token) {
      return new Observable(observer => {
        observer.error('No token found');
        observer.complete();
      });
    }
  
    const headers = {
      Authorization: `Bearer ${token}`
    };
  
    return this.http.get(`${this.baseUrl}/me`, { headers });
  }*/
 
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/all`, { withCredentials: true });
  }
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${userId}`, { 
      withCredentials: true, 
      responseType: 'text' 
    });
  }
  

  // Block a user by ID (adjust endpoint as per your backend)
  blockUser(userId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/block/${userId}`, {}, {
      withCredentials: true,
      responseType: 'text' // ✅ Treat response as plain text
    });
  }
  
  addAdmin(user: User): Observable<any> {
    // Ensure that the user.role is set to Roles.ADMIN in the component
    return this.http.post(`${this.baseUrl}/signup`, user, { withCredentials: true, responseType: 'text' });
  }
  signupWithPhoto(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, formData, { withCredentials: true });
  }
  
  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgot-password`, { email }); // ✔️ object with key 'email'
  }
  
  
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, null, {
      params: { token, newPassword },
      withCredentials: true
    });
  }
  
  
  
  

}

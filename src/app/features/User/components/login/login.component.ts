import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/UserService/auth.service';
import { RolesUser, User } from 'src/app/features/User/models/user.model'; // Import the User model

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  constructor(private router: Router, private authService: AuthService) {}

  onLogin() {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        console.log('Login response:', response);
  
        // ✅ Store the full user object including the ID
        localStorage.setItem('loggedInUser', JSON.stringify(response.user));
  
        if (response.user.role === 'ADMIN') {
          this.router.navigate(['/adminprofile']);
        } else {
          this.router.navigate(['/userprofile']);
        }
      },
      (error) => {
        console.error('Login failed', error);
        alert(error.error?.message || 'Login failed!');
      }
    );
  }
  
  }
  
  
  
  


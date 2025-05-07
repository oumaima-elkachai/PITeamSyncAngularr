import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/UserService/auth.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent {

  token: string = '';
  newPassword: string = '';
  message: string = '';

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }
  

  onSubmit(form: NgForm): void {
    if (form.valid && this.token) {
      this.authService.resetPassword(this.token, this.newPassword).subscribe(
        (response) => {
          this.message = 'Password reset successfully. Redirecting to login...';
          setTimeout(() => this.router.navigate(['/login']), 3000);
        },
        (error) => {
          console.error('Reset password error:', error);
          this.message = error?.error?.message || 'An unexpected error occurred.';
        }
        
      );
    }
  }
}
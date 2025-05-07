import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/services/UserService/auth.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {
  email: string = '';
  message: string = '';

  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.authService.requestPasswordReset(this.email).subscribe(
        (response) => {
          this.message = 'Check your email for the reset link.';
        },
        (error) => {
          this.message = 'Error: ' + error.error.message;
          console.error(error);
        }
      );
    }
  }
  
}
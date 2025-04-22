import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/UserService/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z ]+$')
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      confirmPassword: new FormControl('', Validators.required),
      telephone: new FormControl('', [
        Validators.pattern('^[0-9]{8}$')
      ]),
      role: new FormControl('EMPLOYEE', Validators.required),
      jobTitle: new FormControl(''),
      photo: new FormControl(null)
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSignup(): void {
    const form = this.signupForm;

    if (form.invalid) {
      alert('Please complete the form correctly.');
      form.markAllAsTouched();
      return;
    }

    if (form.value.password !== form.value.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const formData = new FormData();
    formData.append('name', form.value.name);
    formData.append('email', form.value.email);
    formData.append('password', form.value.password);
    formData.append('role', form.value.role);
    formData.append('telephone', form.value.telephone || '');
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile, this.selectedFile.name);
    }

    this.authService.signup(formData).subscribe(
      (response: any) => {
        if (response.user) {
          localStorage.setItem('loggedInUser', JSON.stringify(response.user));
        }
        alert('Signup successful!');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Signup error:', error);
        alert('Signup failed!');
      }
    );
  }
}

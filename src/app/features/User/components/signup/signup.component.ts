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
      photo: new FormControl(null),
      linkedIn: new FormControl(''), // fix: lowercase "linkedin"
      github: new FormControl(''),   // fix: lowercase "github"
      job: new FormControl(''),
      portfolio: new FormControl(''),
      hireDate: new FormControl('')
    });

    // Listen for role changes dynamically
    this.signupForm.controls['role'].valueChanges.subscribe(role => {
      this.updateFormFieldsBasedOnRole(role);
    });

    // Initialize field validators
    this.updateFormFieldsBasedOnRole('EMPLOYEE');
  }

  updateFormFieldsBasedOnRole(role: string): void {
    if (role === 'CANDIDATE') {
      this.signupForm.get('linkedIn')?.setValidators([Validators.required]);
      this.signupForm.get('github')?.setValidators([Validators.required]);
      this.signupForm.get('portfolio')?.setValidators([Validators.required]);
  
      this.signupForm.get('job')?.clearValidators();
      this.signupForm.get('hireDate')?.clearValidators();
  
      // 🔥 Clear the values too if switching to CANDIDATE
      this.signupForm.get('job')?.setValue('');
      this.signupForm.get('hireDate')?.setValue('');
    } 
    else if (role === 'EMPLOYEE') {
      this.signupForm.get('job')?.setValidators([Validators.required]);
      this.signupForm.get('hireDate')?.setValidators([Validators.required]);
  
      this.signupForm.get('linkedIn')?.clearValidators();
      this.signupForm.get('github')?.clearValidators();
      this.signupForm.get('portfolio')?.clearValidators();
  
      // 🔥 Clear the values too if switching to EMPLOYEE
      this.signupForm.get('linkedIn')?.setValue('');
      this.signupForm.get('github')?.setValue('');
      this.signupForm.get('portfolio')?.setValue('');
    }
  
    // Update validity after setting validators
    this.signupForm.get('linkedIn')?.updateValueAndValidity();
    this.signupForm.get('github')?.updateValueAndValidity();
    this.signupForm.get('portfolio')?.updateValueAndValidity();
    this.signupForm.get('job')?.updateValueAndValidity();
    this.signupForm.get('hireDate')?.updateValueAndValidity();
  }
  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSignup(): void {
    if (this.signupForm.invalid) {
      alert('Please complete the form correctly.');
      this.signupForm.markAllAsTouched();
      return;
    }
  
    if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
  
    const formValues = this.signupForm.value;
  
    const user: any = {
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      telephone: formValues.telephone || '',
      role: formValues.role,
      ...(formValues.role === 'CANDIDATE' && {
        linkedIn: formValues.linkedIn || '',
        github: formValues.github || '',
        portfolio: formValues.portfolio || ''
      }),
      ...(formValues.role === 'EMPLOYEE' && {
        job: formValues.job || '',
        hireDate: formValues.hireDate ? formValues.hireDate : null // ✅ important
      })
    };
  
    const formData = new FormData();
    formData.append('user', JSON.stringify(user));
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile, this.selectedFile.name);
    }
  
    this.authService.signup(formData).subscribe({
      next: (response: any) => {
        if (response.user) {
          localStorage.setItem('loggedInUser', JSON.stringify(response.user));
        }
        alert('Signup successful!');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Signup error:', error);
        alert('Signup failed!');
      }
    });
  }
  
  
}

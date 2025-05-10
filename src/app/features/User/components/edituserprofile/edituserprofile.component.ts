import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/UserService/auth.service';
import { RolesUser, User } from '../../models/user.model';

@Component({
  selector: 'app-edituserprofile',
  templateUrl: './edituserprofile.component.html',
  styleUrls: ['./edituserprofile.component.css']
})
export class EdituserprofileComponent implements OnInit {
  editForm!: FormGroup;
  selectedFile: File | null = null;
  user: User = {
    id: '',
    name: '',
    email: '',
    password: '',
    role: RolesUser.EMPLOYEE,
    telephone: '',
    photoUrl: ''
  };

  public RolesUser = RolesUser;

  constructor(private userService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      this.user = JSON.parse(storedUser);

      this.editForm = new FormGroup({
        name: new FormControl(this.user.name, [Validators.required, Validators.pattern('^[A-Za-z ]+$')]),
        email: new FormControl(this.user.email, [Validators.required, Validators.email]),
        password: new FormControl(this.user.password, [Validators.required, Validators.minLength(6)]),
        telephone: new FormControl(this.user.telephone, [Validators.pattern('^[0-9]{8}$')]),
        role: new FormControl(this.user.role, Validators.required),
        linkedIn: new FormControl(this.user.linkedIn || ''),
        github: new FormControl(this.user.github || ''),
        portfolio: new FormControl(this.user.portfolio || ''),
        job: new FormControl(this.user.job || ''),
        hireDate: new FormControl(this.user.hireDate ? new Date(this.user.hireDate) : '') // Convert if needed
      });

      this.updateFormFieldsBasedOnRole(this.user.role);

      this.editForm.controls['role'].valueChanges.subscribe(role => {
        this.updateFormFieldsBasedOnRole(role);
      });
    } else {
      alert('No user found in local storage.');
      this.router.navigate(['/login']);
    }
  }

  updateFormFieldsBasedOnRole(role: string): void {
    if (role === 'CANDIDATE') {
      this.editForm.get('linkedIn')?.setValidators([Validators.required]);
      this.editForm.get('github')?.setValidators([Validators.required]);
      this.editForm.get('portfolio')?.setValidators([Validators.required]);

      this.editForm.get('job')?.clearValidators();
      this.editForm.get('hireDate')?.clearValidators();
      this.editForm.get('job')?.setValue('');
      this.editForm.get('hireDate')?.setValue('');
    } else if (role === 'EMPLOYEE') {
      this.editForm.get('job')?.setValidators([Validators.required]);
      this.editForm.get('hireDate')?.setValidators([Validators.required]);

      this.editForm.get('linkedIn')?.clearValidators();
      this.editForm.get('github')?.clearValidators();
      this.editForm.get('portfolio')?.clearValidators();
      this.editForm.get('linkedIn')?.setValue('');
      this.editForm.get('github')?.setValue('');
      this.editForm.get('portfolio')?.setValue('');
    }

    // Refresh validation
    this.editForm.get('linkedIn')?.updateValueAndValidity();
    this.editForm.get('github')?.updateValueAndValidity();
    this.editForm.get('portfolio')?.updateValueAndValidity();
    this.editForm.get('job')?.updateValueAndValidity();
    this.editForm.get('hireDate')?.updateValueAndValidity();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.editForm.valid && this.user.id) {
      const formValues = this.editForm.value;
      const userObj: any = {
        name: formValues.name,
        email: formValues.email,
        password: formValues.password,
        telephone: formValues.telephone || '',
        role: formValues.role
      };

      if (formValues.role === 'CANDIDATE') {
        Object.assign(userObj, {
          linkedIn: formValues.linkedIn || '',
          github: formValues.github || '',
          portfolio: formValues.portfolio || ''
        });
      } else if (formValues.role === 'EMPLOYEE') {
        Object.assign(userObj, {
          job: formValues.job || '',
          hireDate: formValues.hireDate ? formValues.hireDate : null
        });
      }

      const formData = new FormData();
      formData.append('user', JSON.stringify(userObj));
      if (this.selectedFile) {
        formData.append('photo', this.selectedFile, this.selectedFile.name);
      }

      this.userService.updateUserWithPhoto(this.user.id, formData).subscribe(
        (response: any) => {
          alert('Profile updated successfully!');
          localStorage.setItem('loggedInUser', JSON.stringify(response.user));
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error updating profile:', error);
          alert('Error updating profile!');
        }
      );
    } else {
      alert('Please complete the form correctly.');
    }
  }
}

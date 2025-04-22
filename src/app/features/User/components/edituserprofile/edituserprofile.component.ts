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
        role: new FormControl(this.user.role, Validators.required)
      });
    } else {
      alert('No user found in local storage.');
      this.router.navigate(['/login']);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.editForm.valid && this.user.id) {
      const formData = new FormData();
      formData.append('name', this.editForm.controls['name'].value);
      formData.append('email', this.editForm.controls['email'].value);
      formData.append('password', this.editForm.controls['password'].value);
      formData.append('telephone', this.editForm.controls['telephone'].value || '');
      formData.append('role', this.editForm.controls['role'].value);

      if (this.selectedFile) {
        formData.append('photo', this.selectedFile, this.selectedFile.name);
      }

      this.userService.updateUserWithPhoto(this.user.id, formData).subscribe(
        (response: any) => {
          alert('Profile updated successfully!');
          localStorage.setItem('loggedInUser', JSON.stringify(response.user));
          this.router.navigate(['/userprofile']);
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

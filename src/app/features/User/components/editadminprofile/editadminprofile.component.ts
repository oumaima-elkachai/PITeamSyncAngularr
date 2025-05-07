import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User, RolesUser } from 'src/app/features/User/models/user.model';
import { AuthService } from 'src/app/core/services/UserService/auth.service';

@Component({
  selector: 'app-edit-admin-profile',
  templateUrl: './editadminprofile.component.html',
  styleUrls: ['./editadminprofile.component.css']
})
export class EditAdminProfileComponent implements OnInit {
  adminForm!: FormGroup;
  selectedFile: File | null = null;
  public RolesUser = RolesUser;
  userId: string = '';

  constructor(private userService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      this.userId = user.id || '';
      this.adminForm = new FormGroup({
        name: new FormControl(user.name, [Validators.required]),
        email: new FormControl(user.email, [Validators.required, Validators.email]),
        password: new FormControl(user.password, [Validators.required, Validators.minLength(6)]),
        telephone: new FormControl(user.telephone || '', [Validators.pattern('^[0-9]{8}$')]),
        role: new FormControl(user.role || RolesUser.ADMIN, Validators.required),
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
    if (this.adminForm.valid && this.userId) {
      const userObj = {
        name: this.adminForm.controls['name'].value,
        email: this.adminForm.controls['email'].value,
        password: this.adminForm.controls['password'].value,
        role: this.adminForm.controls['role'].value,
        telephone: this.adminForm.controls['telephone'].value || '',
      };
  
      const formData = new FormData();
      formData.append('user', JSON.stringify(userObj)); // ✔️ THIS is very important
      
      if (this.selectedFile) {
        formData.append('photo', this.selectedFile, this.selectedFile.name);
      }
  
      this.userService.updateUserWithPhoto(this.userId, formData).subscribe(
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

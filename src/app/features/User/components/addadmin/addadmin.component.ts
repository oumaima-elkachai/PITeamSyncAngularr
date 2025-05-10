import { Component } from '@angular/core';
import { RolesUser, User } from '../../models/user.model';
import { AuthService } from 'src/app/core/services/UserService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.css']
})
export class AddadminComponent {

  newAdmin: User = {
    id: '',
    name: '',
    email: '',
    password: '',
    role: RolesUser.ADMIN
  };

  selectedFile: File | null = null;

  constructor(private userService: AuthService, private router: Router) {}

  // Handler for file input changes
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  // When form is submitted, construct a FormData object and call the signup endpoint
  onSubmit(): void {
    // Validate required fields
    if (!this.newAdmin.name || !this.newAdmin.email || !this.newAdmin.password) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.newAdmin.name);
    formData.append('email', this.newAdmin.email);
    formData.append('password', this.newAdmin.password);
    formData.append('role', this.newAdmin.role);
    formData.append('telephone', this.newAdmin.telephone || '');

    if (this.selectedFile) {
      formData.append('photo', this.selectedFile, this.selectedFile.name);
    }

    this.userService.signup(formData).subscribe(
      (response: any) => {
        alert('New admin added successfully!');
        this.router.navigate(['/adminuserlist']);
      },
      (error) => {
        console.error('Error adding admin:', error);
        alert('There was an error adding the admin.');
      }
    );
  }
}
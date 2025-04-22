import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from 'src/app/core/services/UserService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent {
    constructor(private authService: AuthService,     private router: Router // ✅ Inject Router here
    ) {}
  loggedInUser: User | null = null;

  ngOnInit(): void {
    const userString = localStorage.getItem('loggedInUser');
    if (userString) {
      this.loggedInUser = JSON.parse(userString);
      console.log('User photo URL:', this.loggedInUser?.photoUrl);
    }
  }
  get encodedPhotoUrl(): string {
    return this.loggedInUser?.photoUrl 
             ? encodeURI(this.loggedInUser.photoUrl) 
             : 'assets/img/default-profile.png';
  }
  
  logout(): void {
    this.authService.logout().subscribe({
      error: () => {
        // If there's an error calling logout endpoint, clear client data anyway.
        this.authService.logoutClientSide();
      }
    });
  }



  deleteProfile(): void {
    const storedUser = localStorage.getItem('loggedInUser');
    if (!storedUser) {
      alert('User not found in localStorage.');
      return;
    }

    const userId = JSON.parse(storedUser).id;

    if (confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      this.authService.deleteUser(userId).subscribe(
        () => {
          alert('Profile deleted successfully.');
          localStorage.removeItem('loggedInUser');
          this.router.navigate(['/']); // ✅ Will now work
        },
        (error) => {
          console.error('Error deleting user:', error);
          alert('Failed to delete profile.');
        }
      );
    }
  }
  

}

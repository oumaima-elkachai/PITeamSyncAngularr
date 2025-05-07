import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/UserService/auth.service';
import { User } from 'src/app/features/User/models/user.model';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent  implements OnInit{
 
  constructor(private authService: AuthService) {}
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
  
}


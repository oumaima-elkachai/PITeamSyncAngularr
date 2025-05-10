import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from 'src/app/core/services/UserService/auth.service';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css']
})
export class AdminprofileComponent implements OnInit {
  loggedInUser: User | null = null;

 constructor(private authService: AuthService) {}

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


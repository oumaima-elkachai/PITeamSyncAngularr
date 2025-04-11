import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent {

constructor(private router: Router) {}

navigateToAddAttendance() {
  this.router.navigate(['/user/attendance']);
}

}

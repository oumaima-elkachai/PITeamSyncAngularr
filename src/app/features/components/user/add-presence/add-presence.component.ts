import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-presence',
  templateUrl: './add-presence.component.html',
  styleUrls: ['./add-presence.component.css']
})
export class AddPresenceComponent implements OnInit {
  presence = {
    employeeId: '',
    date: '',
    checkInTime: '',
    checkOutTime: ''
  };

  checkInMessage = '';
  checkOutMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.presence.date = this.getTodayDate();
  }

  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  getCurrentTime(): string {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  }

  checkIn(): void {
    this.presence.checkInTime = this.getCurrentTime();
    this.presence.checkOutTime = ''; // reset in case
    this.http.post('http://localhost:8082/api/attendances/saveAttendance', this.presence)
      .subscribe({
        next: response => {
          this.checkInMessage = `Check-in recorded at ${this.presence.checkInTime}`;
          setTimeout(() => {
            this.checkInMessage = '';
          }, 5000); // disappears after 5s
        },
        error: error => {
          console.error('Check-in error:', error);
        }
      });
  }
  checkOut(): void {
    const checkOutTime = this.getCurrentTime();
    this.http.put('http://localhost:8082/api/attendances/updateCheckOutTime', {
      employeeId: this.presence.employeeId,
      date: this.presence.date,
      checkOutTime: checkOutTime
    }).subscribe({
      next: response => {
        this.presence.checkOutTime = checkOutTime;
        this.checkOutMessage = `Check-out recorded at ${checkOutTime}`;
        setTimeout(() => {
          this.checkOutMessage = '';
        }, 5000); // disappears after 5s
      },
      error: error => {
        console.error('Check-out error:', error);
      }
    });
  }
}

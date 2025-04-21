import { Component, OnInit, OnDestroy } from '@angular/core';
import { ParticipationNotificationService } from 'src/app/core/services/participation-notification/participation-notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-notification',
  template: '',  // No template needed, as the service handles notifications
  styles: []
})
export class EventNotificationComponent implements OnInit, OnDestroy {
  private subscription?: Subscription;

  constructor(private notificationService: ParticipationNotificationService) {}

  ngOnInit() {
    this.subscription = this.notificationService.getParticipationUpdates()
      .subscribe(updates => {
        // The service already handles showing notifications
        // This subscription is just to keep track of updates if needed
        console.log('Received participation updates:', updates);
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.notificationService.disconnect();
  }
}

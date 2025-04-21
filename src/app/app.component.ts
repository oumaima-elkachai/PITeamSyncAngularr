import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { WebSocketService } from './core/services/websocket/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  constructor(private webSocketService: WebSocketService) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.webSocketService.subscribe('/topic/events', (message) => {
        console.log('Received message:', message);
      });
    }, 1000);
  }

  ngOnDestroy(): void {
    this.webSocketService.disconnect();
  }
}

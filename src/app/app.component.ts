import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { WebSocketService } from './core/services/websocket/websocket.service';
import { ThemeService } from 'src/app/core/services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private webSocketService: WebSocketService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.webSocketService.initializeWebSocketConnection();
  }

  ngAfterViewInit(): void {
    this.themeService.initializeTheme();
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

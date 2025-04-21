import { Component, AfterViewInit } from '@angular/core';
import { ThemeService } from './core/services/theme/theme.service';
import { WebSocketService } from './core/services/websocket/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  constructor(
    private themeService: ThemeService,
    private webSocketService: WebSocketService
  ) {}

  ngAfterViewInit() {
    // Initialize theme after view is ready
    this.themeService.initializeTheme();
    
    // Initialize WebSocket connection
    this.webSocketService.initConnection();
  }
}

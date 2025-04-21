import { Injectable, OnDestroy } from '@angular/core';
import { Client, IMessage, StompConfig, IFrame } from '@stomp/stompjs';
import { ToastrService } from 'ngx-toastr';
import { Event } from 'src/app/features/events/models/event.model';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import * as SockJS from 'sockjs-client';

@Injectable({ providedIn: 'root' })
export class WebSocketService implements OnDestroy {
  private stompClient!: Client;
  private connectionStatus = new BehaviorSubject<boolean>(false);
  private maxReconnectAttempts = 5;
  private reconnectAttempts = 0;
  private reconnectTimer: any;
  private baseDelay = 1000; // Base delay of 1 second

  constructor(private toastr: ToastrService) {
    this.initConnection();
  }

  // Get the WebSocket URL based on the current protocol
  private getWebSocketUrl(): string {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.hostname;
    const port = '8080'; // Update this based on your backend configuration
    return `${protocol}//${host}:${port}/ws`;
  }

  // Expose connection status as an observable
  public getConnectionStatus(): Observable<boolean> {
    return this.connectionStatus.asObservable();
  }

  private getStompConfig(): StompConfig {
    return {
      webSocketFactory: () => {
        const sockJs = new SockJS('http://localhost:8080/ws');
        sockJs.onclose = (event: CloseEvent) => {
          console.warn('SockJS connection closed:', event);
          this.handleConnectionError();
        };
        return sockJs;
      },
      connectHeaders: {}, // Empty object for headers
      debug: (str: string) => {
        console.log('STOMP: ' + str);
      },
      reconnectDelay: 0, // We'll handle reconnection manually
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onWebSocketError: this.handleWebSocketError.bind(this),
      onDisconnect: this.handleDisconnect.bind(this)
    };
  }

  private handleWebSocketError(error: CloseEvent | Error): void {
    console.error('WebSocket Error:', error);
    this.connectionStatus.next(false);
    this.handleConnectionError();
  }

  private handleConnectionError() {
    this.reconnectAttempts++;
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      // Exponential backoff with jitter
      const jitter = Math.random() * 1000;
      const delay = Math.min(
        (this.baseDelay * Math.pow(2, this.reconnectAttempts - 1)) + jitter, 
        30000
      );
      
      this.toastr.warning(
        `Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`,
        'Connection Error'
      );
      
      this.clearReconnectTimer();
      this.reconnectTimer = setTimeout(() => {
        this.cleanup();
        this.initConnection(); // Reinitialize connection with fresh client
      }, delay);
    } else {
      this.toastr.error(
        'Maximum reconnection attempts reached. Please refresh the page.',
        'Connection Failed'
      );
      this.cleanup();
    }
  }

  private cleanup(): void {
    this.clearReconnectTimer();
    if (this.stompClient?.active) {
      this.stompClient.deactivate();
    }
    this.connectionStatus.next(false);
  }

  ngOnDestroy() {
    this.cleanup();
  }

  initConnection() {
    try {
      this.stompClient = new Client(this.getStompConfig());

      this.stompClient.onConnect = (frame: IFrame) => {
        this.connectionStatus.next(true);
        this.reconnectAttempts = 0; // Reset attempts on successful connection
        this.clearReconnectTimer();
        this.subscribeToChannels();
        this.initHealthCheck();
        this.toastr.success('Connected to WebSocket', 'Connection');
      };

      this.stompClient.onStompError = (frame: IFrame) => {
        console.error('STOMP error:', frame);
        this.handleConnectionError();
      };

      this.attemptConnection();
    } catch (error) {
      console.error('Failed to initialize WebSocket client:', error);
      this.handleConnectionError();
    }
  }

  private attemptConnection() {
    try {
      if (!this.stompClient || !this.stompClient.active) {
        this.stompClient.activate();
      }
    } catch (error) {
      console.error('Failed to connect:', error);
      this.handleConnectionError();
    }
  }

  private handleDisconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.toastr.warning('Disconnected from WebSocket, attempting to reconnect...', 'Connection Lost');
      this.attemptConnection();
    }
  }

  private clearReconnectTimer() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  private subscribeToChannels() {
    this.stompClient.subscribe('/topic/events', (message: IMessage) => {
      try {
        const newEvent: Event = JSON.parse(message.body);
        this.toastr.success(
            `New event: ${newEvent.title}`,
            'Event Added',
            { timeOut: 5000 }
        );
      } catch (e) {
        console.error('Error parsing event:', e);
      }
    });

    this.stompClient.subscribe('/topic/upcoming-events', (message: IMessage) => {
      try {
        const event: Event = JSON.parse(message.body);
        this.toastr.info(
            `Starts at ${event.startTime}`,
            `⏰ ${event.title}`,
            { timeOut: 10000, progressBar: true }
        );
      } catch (e) {
        console.error('Error parsing upcoming event:', e);
      }
    });
  }

  private initHealthCheck() {
    // Check connection health every 30 seconds
    timer(0, 30000).subscribe(() => {
      if (this.stompClient?.connected) {
        try {
          this.stompClient.publish({
            destination: '/app/health',
            body: JSON.stringify({ timestamp: new Date().getTime() })
          });
        } catch (error) {
          console.warn('Health check failed:', error);
          this.handleConnectionError();
        }
      }
    });
  }

  disconnect() {
    this.cleanup();
    this.toastr.info('Disconnected from WebSocket', 'Connection');
  }
}

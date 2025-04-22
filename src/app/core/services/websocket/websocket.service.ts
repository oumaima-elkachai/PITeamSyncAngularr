import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { Client, Frame } from '@stomp/stompjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient!: Client;
  private maxRetries = 3;
  private retryCount = 0;
  private reconnectTimeout: any;
  private serverUrl = this.getServerUrl();

  constructor(private toastr: ToastrService) {
    this.initializeStompClient();
  }

  private getServerUrl(): string {
    // Use window.location to determine the current environment
    const hostname = window.location.hostname;
    const port = window.location.port;
    
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:8080';
    }
    
    // For production, use the same host as the web application
    return window.location.origin;
  }

  private initializeStompClient(): void {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS(`${this.serverUrl}/ws`),
      connectHeaders: {},
      debug: (str) => {
        console.log('STOMP: ' + str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    this.stompClient.onConnect = () => {
      this.retryCount = 0;
      this.toastr.success('Connected to WebSocket server');
      console.log('WebSocket connection established');
    };

    this.stompClient.onStompError = (frame: Frame) => {
      console.error('WebSocket Error:', frame);
      this.handleConnectionError();
    };

    this.stompClient.onWebSocketClose = () => {
      console.log('WebSocket connection closed');
      this.handleConnectionError();
    };

    this.activate();
  }

  private handleConnectionError(): void {
    this.toastr.error('WebSocket connection error');
    
    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      this.toastr.info(`Attempting to reconnect (${this.retryCount}/${this.maxRetries})...`);
      
      if (this.reconnectTimeout) {
        clearTimeout(this.reconnectTimeout);
      }
      
      this.reconnectTimeout = setTimeout(() => {
        this.activate();
      }, 5000);
    } else {
      this.toastr.error('Failed to establish WebSocket connection after multiple attempts');
    }
  }

  private activate(): void {
    this.stompClient.activate();
  }

  disconnect(): void {
    if (this.stompClient?.active) {
      this.stompClient.deactivate();
    }
  }

  subscribe(topic: string, callback: (message: any) => void): void {
    if (this.stompClient?.active) {
      this.stompClient.subscribe(topic, (message) => {
        try {
          const payload = JSON.parse(message.body);
          callback(payload);
        } catch (error) {
          console.error('Error parsing message:', error);
          this.toastr.error('Error processing message');
        }
      });
    } else {
      this.toastr.warning('WebSocket not connected');
      this.activate();
    }
  }

  initializeWebSocketConnection(): void {
    this.initializeStompClient();
  }
}

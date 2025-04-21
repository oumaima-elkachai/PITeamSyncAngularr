import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { Client, Frame } from '@stomp/stompjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient!: Client;
  private serverUrl = 'http://localhost:8080';

  constructor(private toastr: ToastrService) {
    this.initializeStompClient();
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
      this.toastr.success('Connected to WebSocket server');
      console.log('WebSocket connection established');
    };

    this.stompClient.onStompError = (frame: Frame) => {
      console.error('WebSocket Error:', frame);
      this.toastr.error('WebSocket connection error');
    };

    this.activate();
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
}

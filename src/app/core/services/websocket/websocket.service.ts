// websocket.service.ts
import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs'; // Note: Using IMessage instead of Message
import { ToastrService } from 'ngx-toastr';
import { Event } from 'src/app/features/events/models/event.model';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private stompClient!: Client;

  constructor(private toastr: ToastrService) {
    this.initConnection();
  }

  initConnection() {
    this.stompClient = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      reconnectDelay: 5000,
      debug: (str) => console.log('STOMP: ' + str),
      connectionTimeout: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    this.stompClient.onConnect = () => {
      this.subscribeToChannels();
      this.toastr.success('Connected to WebSocket', 'Connection');
    };

    this.stompClient.onStompError = (frame) => {
      this.toastr.error('WebSocket connection error', 'Error');
      console.error('STOMP error:', frame.headers['message']); // Access via index signature
    };

    this.stompClient.activate();
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

  disconnect() {
    if (this.stompClient?.active) {
      this.stompClient.deactivate();
      this.toastr.info('Disconnected from WebSocket', 'Connection');
    }
  }
}

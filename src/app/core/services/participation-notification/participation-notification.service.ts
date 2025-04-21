import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

interface ParticipationUpdate {
  eventId: number;
  userId: number;
  status: 'ACCEPTED' | 'DECLINED' | 'PENDING' | 'REMOVED';
  eventTitle: string;
  userName: string;
  timestamp?: string;
  role?: 'ORGANIZER' | 'PARTICIPANT';
}

@Injectable({
  providedIn: 'root'
})
export class ParticipationNotificationService {
  private stompClient!: Client;
  private participationUpdates = new BehaviorSubject<ParticipationUpdate[]>([]);

  constructor(private toastr: ToastrService) {
    this.initConnection();
  }

  private initConnection() {
    this.stompClient = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    this.stompClient.onConnect = () => {
      this.subscribeToParticipationChannels();
      console.log('Connected to participation WebSocket');
    };

    this.stompClient.onStompError = (frame) => {
      console.error('Participation WebSocket Error:', frame);
    };

    this.stompClient.activate();
  }

  private subscribeToParticipationChannels() {
    // Subscribe to participation updates
    this.stompClient.subscribe('/topic/event-participation', (message: IMessage) => {
      try {
        const update: ParticipationUpdate = JSON.parse(message.body);
        this.handleParticipationUpdate(update);
      } catch (e) {
        console.error('Error parsing participation update:', e);
      }
    });

    // Subscribe to participation requests
    this.stompClient.subscribe('/topic/participation-requests', (message: IMessage) => {
      try {
        const request: ParticipationUpdate = JSON.parse(message.body);
        this.handleParticipationRequest(request);
      } catch (e) {
        console.error('Error parsing participation request:', e);
      }
    });

    // Subscribe to participant removals
    this.stompClient.subscribe('/topic/participant-removed', (message: IMessage) => {
      try {
        const removal: ParticipationUpdate = JSON.parse(message.body);
        this.handleParticipantRemoval(removal);
      } catch (e) {
        console.error('Error parsing participant removal:', e);
      }
    });
  }

  private handleParticipationUpdate(update: ParticipationUpdate) {
    let message = '';
    let title = '';
    let toastrType: 'success' | 'info' | 'warning' = 'info';

    switch (update.status) {
      case 'ACCEPTED':
        message = `${update.userName} has accepted the invitation to "${update.eventTitle}"`;
        title = 'Participation Accepted';
        toastrType = 'success';
        break;
      case 'DECLINED':
        message = `${update.userName} has declined the invitation to "${update.eventTitle}"`;
        title = 'Participation Declined';
        toastrType = 'warning';
        break;
      case 'REMOVED':
        message = `${update.userName} has been removed from "${update.eventTitle}"`;
        title = 'Participant Removed';
        toastrType = 'warning';
        break;
      default:
        return;
    }

    this.toastr[toastrType](message, title, {
      timeOut: 5000,
      progressBar: true
    });

    const current = this.participationUpdates.value;
    this.participationUpdates.next([...current, update]);
  }

  private handleParticipationRequest(request: ParticipationUpdate) {
    const message = `New participation request from ${request.userName} for "${request.eventTitle}"`;
    this.toastr.info(message, 'New Request', {
      timeOut: 8000,
      progressBar: true,
      closeButton: true
    });
  }

  private handleParticipantRemoval(removal: ParticipationUpdate) {
    const message = removal.role === 'ORGANIZER' 
      ? `Organizer ${removal.userName} removed from "${removal.eventTitle}"`
      : `${removal.userName} was removed from "${removal.eventTitle}"`;
      
    this.toastr.warning(message, 'Participant Removed', {
      timeOut: 5000,
      progressBar: true
    });
  }

  // Public method to get participation updates as observable
  getParticipationUpdates() {
    return this.participationUpdates.asObservable();
  }

  disconnect() {
    if (this.stompClient?.active) {
      this.stompClient.deactivate();
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatMessage } from '../../../features/User/models/chatmessage.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = 'http://localhost:8080/api/users/chat';

  constructor(private http: HttpClient) {}

  getChatHistory(conversationId: string) {
    return this.http.get<ChatMessage[]>(
      `http://localhost:8080/api/users/chat/history/${conversationId}`,
      { withCredentials: true }
    );
  }
  getConversations() {
    return this.http.get<string[]>('http://localhost:8080/api/users/chat/conversations', {
      withCredentials: true
    });
  }
  
  getChatByConversation(conversationId: string) {
    return this.http.get<ChatMessage[]>(`http://localhost:8080/api/users/chat/history/${conversationId}`, {
      withCredentials: true
    });
  }
  sendMessage(question: string, conversationId: string) {
    return this.http.post<{ answer: string }>(
      'http://localhost:8080/api/users/chat',
      { question, conversationId },
      { withCredentials: true } // ✅ VERY IMPORTANT
    );
  }
  
}

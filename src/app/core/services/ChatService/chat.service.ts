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

  sendMessage(question: string): Observable<{ answer: string }> {
    return this.http.post<{ answer: string }>(this.baseUrl, { question });
  }

  getChatHistory(): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.baseUrl}/history`);
  }
}

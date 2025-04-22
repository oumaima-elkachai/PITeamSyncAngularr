import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/core/services/ChatService/chat.service';
import { ChatMessage } from '../../models/chatmessage.model';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: ChatMessage[] = [];
  userInput: string = '';
  isLoading: boolean = false;


  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.loadChatHistory();
  }

  loadChatHistory(): void {
    this.chatService.getChatHistory().subscribe({
      next: (history) => (this.messages = history),
      error: (err) => console.error('Failed to load history', err)
    });
  }

  sendMessage(): void {
    if (!this.userInput.trim()) return;
  
    this.isLoading = true;
  
    const userMessage: ChatMessage = {
      sender: 'user',
      message: this.userInput, // <-- was content before
      timestamp: new Date().toISOString()
    };
  
    this.messages.push(userMessage);
  
    this.chatService.sendMessage(this.userInput).subscribe({
      next: (res) => {
        const botMessage: ChatMessage = {
          sender: 'bot',
          message: res.answer, // <-- was content before
          timestamp: new Date().toISOString()
        };
        this.messages.push(botMessage);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to send message', err);
        this.isLoading = false;
      }
    });
  
    this.userInput = '';
  }
  
}

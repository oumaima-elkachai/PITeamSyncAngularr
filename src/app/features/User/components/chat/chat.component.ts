import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/core/services/ChatService/chat.service';
import { ChatMessage } from '../../models/chatmessage.model';
import { v4 as uuidv4 } from 'uuid';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: ChatMessage[] = [];
  conversations: string[] = [];
  userInput: string = '';
  isLoading: boolean = false;
  conversationId: string = '';

  constructor(public chatService: ChatService) {}

  ngOnInit(): void {
    this.loadConversations();
  }

  loadConversations(): void {
    this.chatService.getConversations().subscribe({
      next: (list: string[]) => {
        this.conversations = list;
        if (list.length > 0) {
          this.loadChatByConversation(list[list.length - 1]); // load last
        }
      },
      error: (err: any) => console.error('Error loading conversations', err)
    });
  }

  loadChatByConversation(id: string): void {
    this.conversationId = id;
    this.chatService.getChatByConversation(id).subscribe({
      next: (history: ChatMessage[]) => {
        this.messages = history;
      },
      error: (err: any) => console.error('Error loading chat history', err)
    });
  }

  startNewChat(): void {
    this.conversationId = uuidv4();
    this.messages = [];
  }

  sendMessage(): void {
  if (!this.userInput.trim()) return;

  const userMessage: ChatMessage = {
    sender: 'user',
    message: this.userInput,
    timestamp: new Date().toISOString(),
    conversationId: this.conversationId
  };

  this.messages.push(userMessage);
  this.isLoading = true;

  this.chatService.sendMessage(this.userInput, this.conversationId).subscribe({
    next: (res: { answer: string }) => {
      const botMessage: ChatMessage = {
        sender: 'bot',
        message: res.answer,
        timestamp: new Date().toISOString(),
        conversationId: this.conversationId
      };
      this.messages.push(botMessage);
      this.animateBotMessage(res.answer, this.conversationId);

      // ✅ Automatically push to conversation list if it's not already saved
      if (!this.conversations.includes(this.conversationId)) {
        this.conversations.unshift(this.conversationId); // Add to top like ChatGPT
      }

      this.isLoading = false;
    },
    error: (err: any) => {
      console.error('Failed to send message', err);
      this.isLoading = false;
    }
  });

  this.userInput = '';
}
animateBotMessage(fullMessage: string, conversationId: string) {
  let currentIndex = 0;
  const interval = setInterval(() => {
    if (currentIndex <= fullMessage.length) {
      const partialMessage = fullMessage.substring(0, currentIndex);

      // If message already pushed, update it. If not, push first.
      const lastMessage = this.messages[this.messages.length - 1];
      if (lastMessage && lastMessage.sender === 'bot' && lastMessage.conversationId === conversationId) {
        lastMessage.message = partialMessage;
      } else {
        this.messages.push({
          sender: 'bot',
          message: partialMessage,
          timestamp: new Date().toISOString(),
          conversationId: conversationId
        });
      }
      currentIndex++;
    } else {
      clearInterval(interval);
      this.isLoading = false;
    }
  }, 20); // speed in ms per letter
}

  
}

export interface ChatMessage {
    sender: 'user' | 'bot';
    message: string;
    timestamp: string;
  }
  
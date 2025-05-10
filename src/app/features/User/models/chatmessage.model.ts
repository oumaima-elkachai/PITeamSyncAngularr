export interface ChatMessage {
  sender: string;
  message: string;
  timestamp: string;
  conversationId: string;
  title?: string;
}

import { create } from 'zustand';

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  type: 'text' | 'gif';
}

interface Chat {
  id: string;
  email: string;
  lastMessage?: Message;
  unreadCount: number;
}

interface ChatState {
  chats: Chat[];
  activeChat: string | null;
  messages: Record<string, Message[]>;
  setActiveChat: (chatId: string | null) => void;
  addMessage: (chatId: string, message: Message) => void;
  addChat: (chat: Chat) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  chats: [],
  activeChat: null,
  messages: {},
  setActiveChat: (chatId) => set({ activeChat: chatId }),
  addMessage: (chatId, message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [chatId]: [...(state.messages[chatId] || []), message],
      },
    })),
  addChat: (chat) =>
    set((state) => ({
      chats: [...state.chats, chat],
    })),
}));
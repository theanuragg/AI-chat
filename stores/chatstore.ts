import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Message = {
  type: "user" | "ai";
  text: string;
  html?: string;
  isStreaming?: boolean;
  timestamp: number;
  id: string;
};

export type ChatSession = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
};

interface ChatState {
  // Current chat state
  messages: Message[];
  inputText: string;
  showHeading: boolean;
  hasMessages: boolean;
  isLoading: boolean;
  showDebatePopup: boolean;
  
  // Chat history management
  chatSessions: ChatSession[];
  currentSessionId: string | null;
  
  // Actions
  setInputText: (text: string) => void;
  addMessage: (message: Message) => void;
  updateLastMessage: (updates: Partial<Message>) => void;
  setLoading: (loading: boolean) => void;
  setShowHeading: (show: boolean) => void;
  setHasMessages: (has: boolean) => void;
  setShowDebatePopup: (show: boolean) => void;
  
  // Chat management actions
  startNewChat: () => void;
  loadChatSession: (sessionId: string) => void;
  deleteChatSession: (sessionId: string) => void;
  clearAllChats: () => void;
  saveCurrentSession: () => void;
  resetChat: () => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const generateChatTitle = (firstMessage: string): string => {
  // Generate a title from the first message (first 50 chars)
  return firstMessage.length > 50 
    ? firstMessage.substring(0, 47) + "..." 
    : firstMessage;
};

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      // Initial state
      messages: [],
      inputText: "",
      showHeading: true,
      hasMessages: false,
      isLoading: false,
      showDebatePopup: false,
      chatSessions: [],
      currentSessionId: null,

      // Basic actions
      setInputText: (text) => set({ inputText: text }),

      addMessage: (message) => {
        const messageWithId = {
          ...message,
          id: generateId(),
          timestamp: Date.now(),
        };
        
        set((state) => {
          const newMessages = [...state.messages, messageWithId];
          
          // Auto-save session when adding messages
          const updatedState = { messages: newMessages };
          
          // If this is the first user message, create a new session
          if (message.type === "user" && state.messages.length === 0) {
            const newSession: ChatSession = {
              id: generateId(),
              title: generateChatTitle(message.text),
              messages: [messageWithId],
              createdAt: Date.now(),
              updatedAt: Date.now(),
            };
            
            return {
              ...state,
              ...updatedState,
              currentSessionId: newSession.id,
              chatSessions: [newSession, ...state.chatSessions],
            };
          }
          
          // Update existing session
          if (state.currentSessionId) {
            const updatedSessions = state.chatSessions.map(session =>
              session.id === state.currentSessionId
                ? { ...session, messages: newMessages, updatedAt: Date.now() }
                : session
            );
            
            return {
              ...state,
              ...updatedState,
              chatSessions: updatedSessions,
            };
          }
          
          return { ...state, ...updatedState };
        });
      },

      updateLastMessage: (updates) => set((state) => {
        const newMessages = state.messages.map((msg, idx) =>
          idx === state.messages.length - 1 && msg.type === "ai"
            ? { ...msg, ...updates }
            : msg
        );
        
        // Update session with new messages
        let updatedSessions = state.chatSessions;
        if (state.currentSessionId) {
          updatedSessions = state.chatSessions.map(session =>
            session.id === state.currentSessionId
              ? { ...session, messages: newMessages, updatedAt: Date.now() }
              : session
          );
        }
        
        return {
          ...state,
          messages: newMessages,
          chatSessions: updatedSessions,
        };
      }),

      setLoading: (loading) => set({ isLoading: loading }),
      setShowHeading: (show) => set({ showHeading: show }),
      setHasMessages: (has) => set({ hasMessages: has }),
      setShowDebatePopup: (show) => set({ showDebatePopup: show }),

      // Chat management actions
      startNewChat: () => set({
        messages: [],
        inputText: "",
        showHeading: true,
        hasMessages: false,
        isLoading: false,
        showDebatePopup: false,
        currentSessionId: null,
      }),

      loadChatSession: (sessionId) => {
        const session = get().chatSessions.find(s => s.id === sessionId);
        if (session) {
          set({
            messages: session.messages,
            currentSessionId: sessionId,
            hasMessages: session.messages.length > 0,
            showHeading: session.messages.length === 0,
            inputText: "",
            isLoading: false,
            showDebatePopup: false,
          });
        }
      },

      deleteChatSession: (sessionId) => set((state) => {
        const updatedSessions = state.chatSessions.filter(s => s.id !== sessionId);
        
        // If deleting current session, start new chat
        if (state.currentSessionId === sessionId) {
          return {
            ...state,
            chatSessions: updatedSessions,
            messages: [],
            inputText: "",
            showHeading: true,
            hasMessages: false,
            isLoading: false,
            showDebatePopup: false,
            currentSessionId: null,
          };
        }
        
        return {
          ...state,
          chatSessions: updatedSessions,
        };
      }),

      clearAllChats: () => set({
        messages: [],
        inputText: "",
        showHeading: true,
        hasMessages: false,
        isLoading: false,
        showDebatePopup: false,
        chatSessions: [],
        currentSessionId: null,
      }),

      saveCurrentSession: () => {
        const state = get();
        if (state.messages.length > 0 && !state.currentSessionId) {
          const firstUserMessage = state.messages.find(m => m.type === "user");
          if (firstUserMessage) {
            const newSession: ChatSession = {
              id: generateId(),
              title: generateChatTitle(firstUserMessage.text),
              messages: state.messages,
              createdAt: Date.now(),
              updatedAt: Date.now(),
            };
            
            set((prevState) => ({
              currentSessionId: newSession.id,
              chatSessions: [newSession, ...prevState.chatSessions],
            }));
          }
        }
      },

      resetChat: () => set({
        messages: [],
        inputText: "",
        showHeading: true,
        hasMessages: false,
        isLoading: false,
        showDebatePopup: false,
      }),
    }),
    {
      name: 'chat-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        chatSessions: state.chatSessions,
        currentSessionId: state.currentSessionId,
        messages: state.messages,
        hasMessages: state.hasMessages,
        showHeading: state.showHeading,
      }),
    }
  )
);
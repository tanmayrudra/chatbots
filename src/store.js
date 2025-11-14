import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

const useStore = create((set, get) => ({
  sessions: [],
  currentSessionId: null,
  userPlan: 'free', // 'free' or 'premium'

  // Action to start a new chat
  startNewSession: () => {
    const newSessionId = uuidv4();
    const newSession = { id: newSessionId, messages: [], title: `Chat ${get().sessions.length + 1}` };
    set(state => ({
      sessions: [...state.sessions, newSession],
      currentSessionId: newSessionId,
    }));
  },

  // Action to add a message to the current session
  addMessage: (message) => {
    set(state => {
      const updatedSessions = state.sessions.map(session => {
        if (session.id === state.currentSessionId) {
          return { ...session, messages: [...session.messages, message] };
        }
        return session;
      });
      return { sessions: updatedSessions };
    });
  },

  // Selector to get messages for the current session
  getCurrentMessages: () => {
    const { sessions, currentSessionId } = get();
    const currentSession = sessions.find(s => s.id === currentSessionId);
    return currentSession ? currentSession.messages : [];
  },

  // Action to switch to a different session
  switchSession: (sessionId) => {
    set({ currentSessionId: sessionId });
  },
  
  // Action to delete a session
  deleteSession: (sessionId) => {
    set(state => {
      const updatedSessions = state.sessions.filter(session => session.id !== sessionId);
      let newCurrentSessionId = state.currentSessionId;
      // If the deleted session was the current one, switch to the first available session or null
      if (newCurrentSessionId === sessionId) {
        newCurrentSessionId = updatedSessions.length > 0 ? updatedSessions[0].id : null;
      }
      return { sessions: updatedSessions, currentSessionId: newCurrentSessionId };
    });
  },
  
  // Action to set the user's plan
  setUserPlan: (plan) => set({ userPlan: plan }),
}));

export default useStore;

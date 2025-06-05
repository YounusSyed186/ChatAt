// zustand/conversation.js
import { create } from 'zustand';

const useConversationStore = create((set) => ({
  conversations: [],
  selectedConversation: null,

  // Set all fetched conversations
  setConversations: (data) => set({ conversations: data }),

  // Set the clicked/selected conversation
  setSelectedConversation: (conversation) =>
    set({ selectedConversation: conversation }),
}));

export default useConversationStore;

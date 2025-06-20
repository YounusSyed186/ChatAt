import { create } from "zustand";

const useConversationStore = create((set, get) => ({
  conversations: [],
  selectedConversation: null,

  // Set all fetched conversations
  setConversations: (data) => set({ conversations: data }),

  // Set the clicked/selected conversation
  setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),

  // Store messages for the selected conversation
  messages: [],

  // Set all messages for current conversation
  setMessages: (messages) => set({ messages }),

  // Add a new message or update existing one (for temp message replacement)
  addOrUpdateMessage: (msg) => {
    const messages = get().messages || [];
    const index = messages.findIndex(
      (m) =>
        m._id === msg._id || // match by id
        (m.isLocal && msg.fileName && m.fileName === msg.fileName) // match temp message by filename
    );

    if (index !== -1) {
      // Replace existing message (temp or old)
      const updatedMessages = [...messages];
      updatedMessages[index] = msg;
      set({ messages: updatedMessages });
    } else {
      // Add new message
      set({ messages: [...messages, msg] });
    }
  },
}));

export default useConversationStore;

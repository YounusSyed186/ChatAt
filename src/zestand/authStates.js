import { create } from "zustand";
import { persist } from "zustand/middleware";

const authState = create(
  persist(
    (set) => ({
      userLoggedIn: false,
      token: "",
      user: null,
      isLoading: false,
      logout:false,
      conversation: null,

      setuserLoggedIn: (userLoggedIn) => set({ userLoggedIn }),
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setLogout: (logout) => set({ logout }),
      setConversation: (conversation) => set({ conversation }),
      clear: () =>
        set({
          userLoggedIn: false,
          token: "",
          user: null,
          isLoading: false,
          logout: true,
          conversation: null,
        }),
    }),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({
        userLoggedIn: state.userLoggedIn,
        token: state.token,
        user: state.user,
        logout :state.logout,
        conversation: state.conversation, // <-- Persisted
      }),
    }
  )
);

export default authState;

import { create } from "zustand";
import { persist } from "zustand/middleware";

const authState = create(
  persist(
    (set) => ({
      userLoggedIn: false,
      token: "",
      user: null,
      isLoading: false,

      setuserLoggedIn: (userLoggedIn) => set({ userLoggedIn }),
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      setIsLoading: (isLoading) => set({ isLoading }),
      clear: () =>
        set({
          userLoggedIn: false,
          token: "",
          user: null,
          isLoading: false,
        }),
    }),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({
        userLoggedIn: state.userLoggedIn,
        token: state.token,
        user: state.user,
      }),
    }
  )
);

export default authState;

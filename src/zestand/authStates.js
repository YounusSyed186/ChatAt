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

      setuserLoggedIn: (userLoggedIn) => set({ userLoggedIn }),
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setLogout: (logout) => set({ logout }),
      clear: () =>
        set({
          userLoggedIn: false,
          token: "",
          user: null,
          isLoading: false,
          logout: true,
        }),
    }),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({
        userLoggedIn: state.userLoggedIn,
        token: state.token,
        user: state.user,
        logout :state.logout
      }),
    }
  )
);

export default authState;

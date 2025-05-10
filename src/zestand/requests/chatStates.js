import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import authState from "../authStates";
import { BASE_URL } from "../../config";

const useUserStore = create(
  persist(
    (set) => ({
      users: [],
      friends: [],
      friendRequests: [],

      setUsers: (users) => set({ users }),
      setFriends: (friends) => set({ friends }),
      addUser: (user) => set((state) => ({ users: [...state.users, user] })),

      addFriend: (friend) => set((state) => ({ friends: [...state.friends, friend] })),
      setFriendRequests: (requests) => set({ friendRequests: requests }),

      addFriendRequest: (request) =>
        set((state) => ({ friendRequests: [...state.friendRequests, request] })),
    }),
    {
      name: "user-store",
      getStorage: () => localStorage,
    }
  )
);

export default useUserStore;

// ✅ Helper to get token and check
export const getAuthHeaders = () => {
  const token = authState.getState().token;
  if (!token) throw new Error("Authorization token missing");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};


// ✅ Central error handler
export const handleRequestError = (action, error) => {
  if (error.response) {
    // Server responded with a status other than 2xx
    console.error(`Error ${action}:`, error.response.data?.message || error.response.statusText);
    if (error.response.status === 401) {
      console.warn("Unauthorized: JWT might be missing or invalid.");
    }
  } else if (error.request) {
    // No response from server
    console.error(`No response while ${action}:`, error.request);
  } else {
    // Other errors (e.g., token missing)
    console.error(`Unexpected error while ${action}:`, error.message);
  }
};

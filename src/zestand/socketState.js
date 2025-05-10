// socketState.js
import { create } from "zustand";

const socketState = create((set) => ({
  socketConnected: false,
  setSocketConnected: (status) => set({ socketConnected: status }),
}));

export default socketState;

// store.js

import { create } from "zustand";

const useStore = create((set) => ({
  user: {
      open: false,
      type: 'CONTACT',
  },
  setOpen: (open) => set((state) => ({ user: { ...state.user, open } })),
  setType: (type) => set((state) => ({ user: { ...state.user, type } })),
}));


export default useStore;

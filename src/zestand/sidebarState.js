import { create } from "zustand";

const useSidebarState = create((set) => ({
  selectedIndex: null, // ✅ default is null
  setSelectedIndex: (index) => set({ selectedIndex: index }),
}));
export default useSidebarState;

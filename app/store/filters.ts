import { create } from "zustand";

interface FilterState {
  towbar: boolean;
  setTowbar: (towbar: boolean) => void;
}

const useFilterStore = create<FilterState>()((set) => ({
  towbar: false,
  setTowbar: (towbar) => set({ towbar }),
}));

export default useFilterStore;

// src/stores/useModelStore.js
import create from "zustand";

const useModelStore = create((set) => ({
  model: null,
  setModel: (model) => set({ model }),
}));

export default useModelStore;

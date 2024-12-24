import create from "zustand";

const useModel = create((set) => ({
  model: null,
  setModel: (model) => set({ model }),
}));

export default useModel;

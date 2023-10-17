import { create } from 'zustand';

interface UIStore {
  memoOpen: boolean;

  setMemoOpen: (memoOpen: boolean) => void;
}

export const useUi = create<UIStore>((set) => ({
  memoOpen: false,

  setMemoOpen: (memoOpen: boolean) => set({ memoOpen }),
}));

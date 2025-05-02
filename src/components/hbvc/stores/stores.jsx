import { create } from 'zustand';

export const useStore = create((set) => ({
  animation: 'idle',
  showInfo: false,
  toggleInfo: () => set((state) => ({ showInfo: !state.showInfo })),
}));

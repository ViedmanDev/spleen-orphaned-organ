import { create } from 'zustand';
import { infoTexts } from './infotext';

export const useStore = create((set) => ({
  animation: 'idle',
  showInfo: false,
  infoIndex: 0,
  toggleInfo: () => set((state) => ({ showInfo: !state.showInfo })),
  nextInfo: () => set((state) => ({ infoIndex: (state.infoIndex + 1) % infoTexts.length })),
  prevInfo: () => set((state) => ({ infoIndex: (state.infoIndex - 1 + infoTexts.length) % infoTexts.length })),
}));
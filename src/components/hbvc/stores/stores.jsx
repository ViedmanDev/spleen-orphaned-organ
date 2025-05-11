import { create } from 'zustand';
import { infoTexts } from './infotext';

export const useStore = create((set) => ({
  showInfo: true,
  infoIndex: 0,
  cameraIndex: 0,

  toggleInfo: () => set((state) => ({ showInfo: !state.showInfo })),

  nextInfo: () => set((state) => ({
    infoIndex: (state.infoIndex + 1) % infoTexts.length,
    cameraIndex: (state.cameraIndex + 1) % 4, // 4 esquinas
  })),

  prevInfo: () => set((state) => ({
    infoIndex: (state.infoIndex - 1 + infoTexts.length) % infoTexts.length,
    cameraIndex: (state.cameraIndex - 1 + 4) % 4,
  })),
}));

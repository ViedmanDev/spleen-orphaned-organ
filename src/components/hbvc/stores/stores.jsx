import { create } from 'zustand';
import { infoTexts } from './infotext';

export const useStore = create((set) => ({
  showInfo: true,
  infoIndex: 0,
  cameraIndex: 0,
  modelFocus: 'main',
  infoPosition: [0, 1.2, 0],

  setInfoPosition: (pos) => set(() => ({ infoPosition: pos })),

  toggleInfo: () => set((state) => ({ showInfo: !state.showInfo })),
  setModelFocus: (model) => set(() => ({ modelFocus: model })),
  setInfoIndex: (index) => set(() => ({ infoIndex: index })),

  nextInfo: () => set((state) => ({
    infoIndex: (state.infoIndex + 1) % infoTexts.length,
    cameraIndex: (state.cameraIndex + 1) % 4,
  })),

  prevInfo: () => set((state) => ({
    infoIndex: (state.infoIndex - 1 + infoTexts.length) % infoTexts.length,
    cameraIndex: (state.cameraIndex - 1 + 4) % 4,
  })),
}));

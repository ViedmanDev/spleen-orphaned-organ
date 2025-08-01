"use client";

import { create } from "zustand";
import { infoTexts } from "./Infotext";

export const useStore = create((set) => ({
  showInfo: true,
  infoIndex: 0,
  cameraIndex: 0,
  activeModel: null,
  
  // Audio state
  isAudioPlaying: false,
  audioVolume: 0.5,
  
  toggleInfo: () => set((state) => ({ showInfo: !state.showInfo })),
  
  nextInfo: () =>
    set((state) => ({
      infoIndex: (state.infoIndex + 1) % infoTexts.length,
      cameraIndex: (state.cameraIndex + 1) % 4,
    })),
  
  prevInfo: () =>
    set((state) => ({
      infoIndex: (state.infoIndex - 1 + infoTexts.length) % infoTexts.length,
      cameraIndex: (state.cameraIndex - 1 + 4) % 4,
    })),
  
  setActiveModel: (modelId) => set({ activeModel: modelId }),
  
  // Audio controls
  toggleAudio: () => set((state) => ({ isAudioPlaying: !state.isAudioPlaying })),
  setAudioVolume: (volume) => set({ audioVolume: volume }),
}));
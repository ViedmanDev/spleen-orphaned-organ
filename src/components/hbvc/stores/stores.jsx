import { create } from 'zustand';

export const useStore = create((set) => ({
  // Estados para TrombosisScene
  tShowInfo: false,
  tInfoIndex: 0,
  tCameraIndex: 0,
  
  // Estados para TreatmentScene
  trShowInfo: false,
  trInfoIndex: 0,
  
  // Acciones para TrombosisScene
  toggleTInfo: () => set(state => ({ tShowInfo: !state.tShowInfo })),
  nextTInfo: () => set(state => ({ 
    tInfoIndex: (state.tInfoIndex + 1) % 4, // Ajusta el número según tus textos
    tCameraIndex: (state.tCameraIndex + 1) % 4 
  })),
  prevTInfo: () => set(state => ({ 
    tInfoIndex: (state.tInfoIndex - 1 + 4) % 4,
    tCameraIndex: (state.tCameraIndex - 1 + 4) % 4
  })),
  
  // Acciones para TreatmentScene
  toggleTrInfo: () => set(state => ({ trShowInfo: !state.trShowInfo })),
  nextTrInfo: () => set(state => ({ 
    trInfoIndex: (state.trInfoIndex + 1) % 4 // Ajusta según tus textos
  })),
  prevTrInfo: () => set(state => ({ 
    trInfoIndex: (state.trInfoIndex - 1 + 4) % 4 
  }))
}));
import { create } from "zustand";


const useCardByCategoryStore = create((set) => ({
  card: null,
  setCard: (card) => set({ card }),
  resetCard: () => set({ card: {} }),
  selectedVariantFromStore: 0,
  setSelectedVariantFromStore: (selectedVariant) => set({ selectedVariant }),
  times: 0,
  setTimes: (times) => set({ times }),
}));

export default useCardByCategoryStore;

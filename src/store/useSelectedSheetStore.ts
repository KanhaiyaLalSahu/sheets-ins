import { create } from "zustand";

interface SelectedSheetState {
  selectedSheet: number | null;
  setSelectedSheet: (sheetNumber: number) => void;
}

export const useSelectedSheetStore = create<SelectedSheetState>((set) => ({
  selectedSheet: null,
  setSelectedSheet: (sheetNumber) => set({ selectedSheet: sheetNumber }),
}));

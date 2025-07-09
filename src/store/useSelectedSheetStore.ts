import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SelectedSheetState {
  selectedSheet: number | null;
  setSelectedSheet: (sheetNumber: number) => void;
}

export const useSelectedSheetStore = create<SelectedSheetState>()(
  persist(
    (set) => ({
      selectedSheet: null,
      setSelectedSheet: (sheetNumber) => set({ selectedSheet: sheetNumber }),
    }),
    {
      name: "selected-sheet-storage",
    }
  )
);

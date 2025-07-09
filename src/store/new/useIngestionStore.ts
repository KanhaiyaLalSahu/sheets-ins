import { create } from "zustand";

interface IngestionState {
  ingestionId: string | null;
  columns: string[];
  setIngestionInfo: (ingestionId: string, columns: string[]) => void;
  resetIngestionInfo: () => void;
}

export const useIngestionStore = create<IngestionState>((set) => ({
  ingestionId: null,
  columns: [],
  setIngestionInfo: (ingestionId, columns) =>
    set({ ingestionId, columns }),
  resetIngestionInfo: () =>
    set({ ingestionId: null, columns: [] }),
}));

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IngestionState {
  ingestionId: string | null;
  columns: string[];
  setIngestionInfo: (ingestionId: string, columns: string[]) => void;
  resetIngestionInfo: () => void;
}

export const useIngestionStore = create<IngestionState>()(
  persist(
    (set) => ({
      ingestionId: null,
      columns: [],
      setIngestionInfo: (ingestionId, columns) =>
        set({ ingestionId, columns }),
      resetIngestionInfo: () => set({ ingestionId: null, columns: [] }),
    }),
    {
      name: "ingestion-storage", // key in localStorage
    }
  )
);

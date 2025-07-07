import { create } from "zustand";

interface SortStore {
  column: string | null;
  ascending: boolean;
  setSort: (column: string, ascending: boolean) => void;
}

export const useSortStore = create<SortStore>((set) => ({
  column: null,
  ascending: true,
  setSort: (column, ascending) => set({ column, ascending }),
}));

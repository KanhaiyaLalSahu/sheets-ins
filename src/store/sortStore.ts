import { create } from "zustand";

interface SortState {
  ascending: boolean;
  // Allow explicitly setting the direction
  setSort: (direction: "asc" | "desc") => void;
  toggleSort: () => void;
}

export const useSortStore = create<SortState>((set) => ({
  ascending: true,
  setSort: (direction) =>
    set(() => ({
      ascending: direction === "asc",
    })),
  toggleSort: () =>
    set((state) => ({
      ascending: !state.ascending,
    })),
}));

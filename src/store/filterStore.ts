
import { create } from "zustand";

interface FilterStore {
  status: string;      // e.g., "All"
  priority: string;    // e.g., "All"
  dueDateRange: [string, string] | null; // [startDate, endDate]
  estValueRange: [number, number] | null; // [min, max]
  setStatus: (status: string) => void;
  setPriority: (priority: string) => void;
  setDueDateRange: (range: [string, string] | null) => void;
  setEstValueRange: (range: [number, number] | null) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  status: "All",
  priority: "All",
  dueDateRange: null,
  estValueRange: null,
  setStatus: (status) => set({ status }),
  setPriority: (priority) => set({ priority }),
  setDueDateRange: (range) => set({ dueDateRange: range }),
  setEstValueRange: (range) => set({ estValueRange: range }),
}));

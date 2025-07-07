import { create } from "zustand";

export interface SpreadsheetRow {
  [key: string]: string | number | boolean | null;
}

interface SpreadsheetDataState {
  data: SpreadsheetRow[];

  // Overwrite everything (CSV import or backend fetch)
  setData: (rows: SpreadsheetRow[]) => void;

  // Add a new row manually
  addRow: (row: SpreadsheetRow) => void;

  // Update a row by index (e.g., inline editing)
  updateRow: (index: number, updatedRow: SpreadsheetRow) => void;

  // Delete a row by index
  deleteRow: (index: number) => void;
}

export const useSpreadsheetDataStore = create<SpreadsheetDataState>((set) => ({
  data: [],
  setData: (rows) => set({ data: rows }),
  addRow: (row) => set((state) => ({ data: [...state.data, row] })),
  updateRow: (index, updatedRow) =>
    set((state) => {
      const newData = [...state.data];
      newData[index] = updatedRow;
      return { data: newData };
    }),
  deleteRow: (index) =>
    set((state) => {
      const newData = [...state.data];
      newData.splice(index, 1);
      return { data: newData };
    }),
}));

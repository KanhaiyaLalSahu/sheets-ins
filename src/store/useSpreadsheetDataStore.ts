import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SpreadsheetRow {
  [key: string]: string | number | boolean | null;
}

interface SpreadsheetDataState {
  headers: string[];
  data: SpreadsheetRow[];
  setData: (headers: string[], rows: SpreadsheetRow[]) => void;
  addRow: (row: SpreadsheetRow) => void;
  updateRow: (index: number, updatedRow: SpreadsheetRow) => void;
  deleteRow: (index: number) => void;
  clearData: () => void;
}

export const useSpreadsheetDataStore = create<SpreadsheetDataState>()(
  persist(
    (set) => ({
      headers: [],
      data: [],
      setData: (headers, rows) => set({ headers, data: rows }),
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
      clearData: () => set({ headers: [], data: [] }),
    }),
    {
      name: "spreadsheet-data-storage",
    }
  )
);

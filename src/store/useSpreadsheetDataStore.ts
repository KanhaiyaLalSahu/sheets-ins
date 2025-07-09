import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SpreadsheetRow {
  [key: string]: string | number | boolean | null;
}

interface SpreadsheetDataState {
  data: SpreadsheetRow[];
  setData: (rows: SpreadsheetRow[]) => void;
  addRow: (row: SpreadsheetRow) => void;
  updateRow: (index: number, updatedRow: SpreadsheetRow) => void;
  deleteRow: (index: number) => void;
}

export const useSpreadsheetDataStore = create<SpreadsheetDataState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: "spreadsheet-data-storage",
    }
  )
);

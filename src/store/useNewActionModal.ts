import { create } from "zustand";

interface NewActionModalState {
  isOpen: boolean;
  step: number;
  prompt: string;
  selectedOption: string | null;
  contentFormat: string;
  selectedColumns: string[];
  columnsToMigrate: string[];
  classification: null | { needsNewRows: boolean; reason: string };
  newSheet: boolean;
  columnName: string;
  description: string;
  outputFormat: string;
  actionName: string;
  actionId: number;
  setStep: (step: number) => void;
  setPrompt: (prompt: string) => void;
  setSelectedOption: (option: string | null) => void;
  setContentFormat: (format: string) => void;
  toggleColumn: (column: string) => void;
  toggleMigrateColumn: (column: string) => void;
  setClassification: (result: NewActionModalState["classification"]) => void;
  setNewSheet: (val: boolean) => void;
  setColumnName: (name: string) => void;
  setDescription: (desc: string) => void;
  setOutputFormat: (format: string) => void;
  setActionName: (name: string) => void;
  setActionId: (id: number) => void;
  open: () => void;
  close: () => void;
  reset: () => void;
}

export const useNewActionModal = create<NewActionModalState>((set) => ({
  isOpen: false,
  step: 1,
  prompt: "",
  selectedOption: null,
  contentFormat: "",
  selectedColumns: [],
  columnsToMigrate: [],
  classification: null,
  newSheet: false,
  columnName: "",
  description: "",
  outputFormat: "",
  actionName: "Ask Open AI",
  actionId: 1,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false, step: 1 }),
  reset: () =>
    set({
      isOpen: false,
      step: 1,
      prompt: "",
      selectedOption: null,
      contentFormat: "",
      selectedColumns: [],
      columnsToMigrate: [],
      classification: null,
      newSheet: false,
      columnName: "",
      description: "",
      outputFormat: "",
      actionName: "",
      actionId: 1,
    }),
  setStep: (step) => set({ step }),
  setPrompt: (prompt) => set({ prompt }),
  setSelectedOption: (option) => set({ selectedOption: option }),
  setContentFormat: (format) => set({ contentFormat: format }),
  toggleColumn: (column) =>
    set((state) => ({
      selectedColumns: state.selectedColumns.includes(column)
        ? state.selectedColumns.filter((c) => c !== column)
        : [...state.selectedColumns, column],
    })),
  toggleMigrateColumn: (column) =>
    set((state) => ({
      columnsToMigrate: state.columnsToMigrate.includes(column)
        ? state.columnsToMigrate.filter((c) => c !== column)
        : [...state.columnsToMigrate, column],
    })),
  setClassification: (classification) => set({ classification }),
  setNewSheet: (val) => set({ newSheet: val }),
  setColumnName: (name) => set({ columnName: name }),
  setDescription: (desc) => set({ description: desc }),
  setOutputFormat: (format) => set({ outputFormat: format }),
  setActionName: (name) => set({ actionName: name }),
  setActionId: (id) => set({ actionId: id }),
}));

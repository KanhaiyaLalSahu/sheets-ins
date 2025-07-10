// store/useNewActionModal.ts
import { create } from "zustand";

interface NewActionModalState {
  isOpen: boolean;
  step: number;
  prompt: string;
  selectedOption: string | null;
  contentFormat: string;
  selectedColumns: string[];
  classification: null | { needsNewRows: boolean; reason: string };
  reset: () => void;
  open: () => void;
  close: () => void;
  setStep: (step: number) => void;
  setPrompt: (prompt: string) => void;
  setSelectedOption: (option: string | null) => void;
  setContentFormat: (format: string) => void;
  toggleColumn: (column: string) => void;
  setClassification: (result: NewActionModalState["classification"]) => void;
}

export const useNewActionModal = create<NewActionModalState>((set) => ({
  isOpen: false,
  step: 1,
  prompt: "",
  selectedOption: null,
  contentFormat: "",
  selectedColumns: [],
  classification: null,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false, step: 1 }),
  reset: () => set({
    isOpen: false,
    step: 1,
    prompt: "",
    selectedOption: null,
    contentFormat: "",
    selectedColumns: [],
    classification: null,
  }),
  setStep: (step) => set({ step }),
  setPrompt: (prompt) => set({ prompt }),
  setSelectedOption: (option) => set({ selectedOption: option }),
  setContentFormat: (format) => set({ contentFormat: format }),
  toggleColumn: (column) => set((state) => ({
    selectedColumns: state.selectedColumns.includes(column)
      ? state.selectedColumns.filter(c => c !== column)
      : [...state.selectedColumns, column]
  })),
  setClassification: (classification) => set({ classification }),
}));
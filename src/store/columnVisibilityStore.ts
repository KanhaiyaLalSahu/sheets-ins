import { create } from "zustand";

interface ColumnVisibilityStore {
  hiddenColumns: string[];
  toggleColumn: (id: string, visible?: boolean) => void;
  isColumnHidden: (id: string) => boolean;
}


export const useColumnVisibilityStore = create<ColumnVisibilityStore>((set, get) => ({
  hiddenColumns: [],
toggleColumn: (id, visible = undefined) => set((state) => {
  const isHidden = state.hiddenColumns.includes(id);
  let nextHidden = [...state.hiddenColumns];
  if (visible === undefined) {
    // toggle
    if (isHidden) {
      nextHidden = nextHidden.filter((c) => c !== id);
    } else {
      nextHidden.push(id);
    }
  } else if (visible === true) {
    // ensure visible
    nextHidden = nextHidden.filter((c) => c !== id);
  } else {
    // ensure hidden
    if (!isHidden) {
      nextHidden.push(id);
    }
  }
  return { hiddenColumns: nextHidden };
}),
  isColumnHidden: (id) => get().hiddenColumns.includes(id),
}));

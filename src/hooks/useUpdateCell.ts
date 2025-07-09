import { useMutation } from "@tanstack/react-query";
import { apiConnector } from "../services/utils/apiConnector";

interface UpdateCellParams {
  ingestionId: string;
  sheetNumber: number;
  rowIndex: number;
  columnIndex: number;
  value: string;
}

export const useUpdateCell = () => {
  return useMutation({
    mutationFn: async ({
      ingestionId,
      sheetNumber,
      rowIndex,
      columnIndex,
      value,
    }: UpdateCellParams) => {
      const url = `/api/sheets/${ingestionId}/${sheetNumber}/cells/${rowIndex}/${columnIndex}`;
      await apiConnector("PUT", url, { value });
      console.log("Cell updated successfully");
    },
  });
};

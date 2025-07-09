import { useMutation } from "@tanstack/react-query";
import { apiConnector } from "../services/utils/apiConnector";

interface AddRowParams {
  ingestionId: string;
  sheetNumber: number; // clearly a number
  rowData: string[];
}

export const useAddRow = () => {
  return useMutation({
    mutationFn: async ({ ingestionId, sheetNumber, rowData }: AddRowParams) => {
      const url = `/api/sheets/${ingestionId}/${sheetNumber}/rows`;
      const res = await apiConnector("POST", url, { rowData });
      console.log("Row added successfully:", res.data);
      return res.data;
    },
  });
};

// hooks/useAddColumn.ts
import { useMutation } from "@tanstack/react-query";
import { apiConnector } from "../services/utils/apiConnector";

export interface AddColumnParams {
  ingestionId: string;
  prompt: string;
  selectedColumns: string[];
  tableData: {
    headers: string[];
    rows: string[][];
  };
  newSheet: boolean;
  sourceSheetNumber: number | null;
  columnName: string;
  description: string;
  outputFormat: string;
  columnsToMigrate: string[];
  actionName: string;
  actionId: number;
}

interface AddColumnResponse {
  status: "started";
  targetSheet: number;
  sourceSheet: number;
  isNewSheet: boolean;
}

export const useAddColumn = () => {
  return useMutation<AddColumnResponse, Error, AddColumnParams>({
    mutationFn: async (params) => {
      const res = await apiConnector<AddColumnResponse>(
        "POST",
        `/api/ingest/addcolumn`,
        params
      );
      console.log("Add column response:", res.data);
      return res.data;
    },
  });
};

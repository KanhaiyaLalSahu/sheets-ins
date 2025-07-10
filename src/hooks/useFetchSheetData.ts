import { useQuery } from "@tanstack/react-query";
import { apiConnector } from "../services/utils/apiConnector";

interface SheetDataResponse {
  headers: string[];
  rows: string[][];
  sheetName: string;
}

export const useFetchSheetData = (ingestionId: string | null, sheetNumber: number | null) => {
  return useQuery<SheetDataResponse>({
    enabled: !!ingestionId && sheetNumber !== null,
    queryKey: ["sheetData", ingestionId, sheetNumber],
    queryFn: async () => {
      const res = await apiConnector<SheetDataResponse>(
        "GET",
        `/api/sheets/${ingestionId}/${sheetNumber}`
      );
      console.log("Fetched sheet data:", res.data);
      return res.data;
    },
  });
};


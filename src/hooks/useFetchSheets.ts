import { useQuery } from "@tanstack/react-query";
import { apiConnector } from "../services/utils/apiConnector";

interface Sheet {
  sheetNumber: number;
  sheetName: string;
}

interface SheetsResponse {
  response: Sheet[];
}

export const useFetchSheets = (ingestionId: string | null) => {
  return useQuery<Sheet[]>({
    enabled: !!ingestionId,
    queryKey: ["sheets", ingestionId],
    queryFn: async () => {
      const res = await apiConnector<SheetsResponse>(
        "GET",
        `/api/sheets/${ingestionId}`
      );
      return res.data.response;
    },
  });
};


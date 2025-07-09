import { useMutation } from "@tanstack/react-query";
import { apiConnector } from "../services/utils/apiConnector";
import { useIngestionStore } from "../store/new/useIngestionStore";

interface IngestCsvResponse {
  ingestionId: string;
  columns: string[];
}

export const useIngestCsv = () => {
  const setIngestionInfo = useIngestionStore((s) => s.setIngestionInfo);

  return useMutation({
    mutationFn: async (file: File): Promise<IngestCsvResponse> => {
      const formData = new FormData();
      formData.append("file", file);

      const res = await apiConnector<IngestCsvResponse>(
        "POST",
        "/api/ingest/csv",
        formData
      );

      return res.data;
    },
    onSuccess: (data) => {
      setIngestionInfo(data.ingestionId, data.columns);
    },
  });
};

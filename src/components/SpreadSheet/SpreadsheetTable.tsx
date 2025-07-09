import React, { useMemo, useState } from "react";
import { useSpreadsheetDataStore } from "../../store/useSpreadsheetDataStore";
import { useSearchStore } from "../../store/searchStore";
import { useSortStore } from "../../store/sortStore";
import { useColumnVisibilityStore } from "../../store/columnVisibilityStore";
import { useSelectedSheetStore } from "../../store/useSelectedSheetStore";
import { useIngestionStore } from "../../store/new/useIngestionStore";
import { useFetchSheetData } from "../../hooks/useFetchSheetData";
import { Plus } from "lucide-react";
import Modal from "./Modal";

export const SpreadsheetTable: React.FC = () => {
  const ingestionId = useIngestionStore((s) => s.ingestionId);
  const { selectedSheet } = useSelectedSheetStore();

  const { data, isLoading, isError } = useFetchSheetData(
    ingestionId,
    selectedSheet
  );

  const { query } = useSearchStore();
  const { column: sortColumn, ascending } = useSortStore();
  const { hiddenColumns } = useColumnVisibilityStore();

  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  // Transform API data into array of objects
  const tableData = useMemo(() => {
    if (!data) return [];
    return data.rows.map((rowArr) => {
      const obj: Record<string, string> = {};
      data.headers.forEach((header, idx) => {
        obj[header] = rowArr[idx] ?? "";
      });
      return obj;
    });
  }, [data]);

  // All columns
  const allColumns = useMemo(() => data?.headers ?? [], [data]);

  // Visible columns
  const visibleColumns = allColumns.filter((k) => !hiddenColumns.includes(k));

  // Sort
  const sortedData = useMemo(() => {
    if (!sortColumn) return tableData;
    return [...tableData].sort((a, b) => {
      const aVal = String(a[sortColumn] ?? "").toLowerCase();
      const bVal = String(b[sortColumn] ?? "").toLowerCase();
      if (aVal < bVal) return ascending ? -1 : 1;
      if (aVal > bVal) return ascending ? 1 : -1;
      return 0;
    });
  }, [tableData, sortColumn, ascending]);

  // Filter
  const filteredData = useMemo(() => {
    if (!query.trim()) return sortedData;
    return sortedData.filter((row) =>
      Object.values(row).some((val) =>
        String(val ?? "").toLowerCase().includes(query.trim().toLowerCase())
      )
    );
  }, [sortedData, query]);

  if (isLoading) {
    return (
      <div className="p-4 text-sm text-gray-500">Loading sheet data...</div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-sm text-red-500">
        Failed to load sheet data.
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-4 text-sm text-gray-500">No data available.</div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white">
      <table className="border-collapse w-full min-w-max">
        <thead className="sticky top-0 z-10 bg-gray-50">
          <tr>
            <th className="px-2 py-1 border border-gray-200 text-xs font-semibold text-gray-500 text-center whitespace-nowrap">
              #
            </th>
            {visibleColumns.map((key) => (
              <th
                key={key}
                className="min-w-[120px] px-2 py-1 border border-gray-200 text-sm font-semibold text-left whitespace-nowrap"
              >
                {key}
              </th>
            ))}
            <th className="w-[120px] px-2 py-1 border border-gray-200 text-center">
              <Plus className="w-4 h-4 inline" />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="px-2 py-1 text-xs text-gray-500 text-center border border-gray-200 whitespace-nowrap">
                {idx + 1}
              </td>
              {visibleColumns.map((key) => {
                const cellValue = String(row[key] ?? "");
                return (
                  <td
                    key={key}
                    className="min-w-[120px] max-w-[240px] truncate px-2 py-1 border border-gray-200 text-sm cursor-pointer"
                    onClick={() => setExpandedContent(cellValue)}
                    title={cellValue}
                  >
                    {cellValue}
                  </td>
                );
              })}
              <td className="border border-gray-200" />
            </tr>
          ))}
        </tbody>
      </table>

      {expandedContent && (
        <Modal onClose={() => setExpandedContent(null)}>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">Full Content</h2>
            <p className="whitespace-pre-wrap break-words">{expandedContent}</p>
            <button
              onClick={() => setExpandedContent(null)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SpreadsheetTable;

import React, { useMemo, useState, useEffect } from "react";
import { useSpreadsheetDataStore } from "../../store/useSpreadsheetDataStore";
import { useSearchStore } from "../../store/searchStore";
import { useSortStore } from "../../store/sortStore";
import { useColumnVisibilityStore } from "../../store/columnVisibilityStore";
import { useSelectedSheetStore } from "../../store/useSelectedSheetStore";
import { useIngestionStore } from "../../store/new/useIngestionStore";
import { useFetchSheetData } from "../../hooks/useFetchSheetData";
import { Plus } from "lucide-react";
import Modal from "./Modal";
import { useUpdateCell } from "../../hooks/useUpdateCell";
import { useAddRow } from "../../hooks/useAddRow";

export const SpreadsheetTable: React.FC = () => {
  const ingestionId = useIngestionStore((s) => s.ingestionId);
  const { selectedSheet } = useSelectedSheetStore();
  const {
    data: apiData,
    isLoading,
    isError,
  } = useFetchSheetData(ingestionId, selectedSheet);

  const {
    data: storeRows,
    setData,
    updateRow,
    addRow,
  } = useSpreadsheetDataStore();

  const [newRow, setNewRow] = useState<Record<string, string>>({});
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const updateCell = useUpdateCell();
  const addRowMutation = useAddRow();

  const { query } = useSearchStore();
  const { column: sortColumn, ascending } = useSortStore();
  const { hiddenColumns } = useColumnVisibilityStore();

  const allColumns = useMemo(() => apiData?.headers ?? [], [apiData]);
  const visibleColumns = allColumns.filter(
    (key) => !hiddenColumns.includes(key)
  );

  // Sync Zustand store with fetched data
  useEffect(() => {
    if (apiData?.headers && apiData?.rows) {
      const mapped = apiData.rows
        .filter((rowArr) => Array.isArray(rowArr))
        .map((rowArr) => {
          const obj: Record<string, string> = {};
          apiData.headers.forEach((header, idx) => {
            obj[header] = rowArr?.[idx] ?? "";
          });
          return obj;
        });
      setData(apiData.headers,mapped);
    }
  }, [apiData, setData]);

  // Apply sorting
  const sortedData = useMemo(() => {
    if (!sortColumn) return storeRows;
    return [...storeRows].sort((a, b) => {
      const aVal = String(a?.[sortColumn] ?? "").toLowerCase();
      const bVal = String(b?.[sortColumn] ?? "").toLowerCase();
      return ascending ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });
  }, [storeRows, sortColumn, ascending]);

  // Apply filtering
  const filteredData = useMemo(() => {
    if (!query.trim()) return sortedData;
    return sortedData.filter((row) =>
      Object.values(row).some((val) =>
        String(val ?? "")
          .toLowerCase()
          .includes(query.trim().toLowerCase())
      )
    );
  }, [sortedData, query]);

  if (isLoading) {
    return (
      <div className="p-4 text-sm text-gray-500">Loading sheet data...</div>
    );
  }

  if (isError || !apiData) {
    return (
      <div className="p-4 text-sm text-red-500">Failed to load sheet data.</div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white my-scrollbar">
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
              <td className="px-2 py-1 text-xs text-gray-500 text-center border border-gray-200">
                {idx + 1}
              </td>
              {visibleColumns.map((key) => (
                <td
                  key={key}
                  className="min-w-[120px] border border-gray-200 px-2 py-1"
                >
                  <input
                    value={String(row?.[key] ?? "")}
                    onChange={(e) => {
                      const updated = { ...row, [key]: e.target.value };
                      updateRow(idx, updated);
                    }}
                    onBlur={(e) => {
                      if (!ingestionId || selectedSheet === null) return;
                      updateCell.mutate({
                        ingestionId,
                        sheetNumber: selectedSheet,
                        rowIndex: idx,
                        columnIndex: allColumns.indexOf(key),
                        value: e.target.value,
                      });
                    }}
                    className="w-full px-1 py-0.5 text-sm"
                  />
                </td>
              ))}
              <td className="border border-gray-200" />
            </tr>
          ))}

          {/* Add New Row */}
          <tr className="hover:bg-gray-50">
            <td className="px-2 py-1 text-xs text-gray-500 text-center border border-gray-200">
              {filteredData.length + 1}
            </td>
            {visibleColumns.map((key) => (
              <td
                key={key}
                className="min-w-[120px] border border-gray-200 px-2 py-1"
              >
                <input
                  value={newRow[key] ?? ""}
                  onChange={(e) =>
                    setNewRow((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }))
                  }
                  className="w-full px-1 py-0.5 text-sm"
                />
              </td>
            ))}
            <td className="border border-gray-200 text-center">
              <button
                onClick={() => {
                  if (!ingestionId || selectedSheet === null) return;
                  const rowData = allColumns.map((col) => newRow[col] ?? "");
                  if (rowData.every((v) => v === "")) {
                    alert("Cannot submit an empty row.");
                    return;
                  }

                  addRowMutation.mutate(
                    {
                      ingestionId,
                      sheetNumber: selectedSheet,
                      rowData,
                    },
                    {
                      onSuccess: () => {
                        // Append new row to Zustand
                        addRow(
                          // build the object with all columns
                          allColumns.reduce((acc, col, idx) => {
                            acc[col] = rowData[idx];
                            return acc;
                          }, {} as Record<string, string>)
                        );
                        setNewRow({});
                      },
                    }
                  );
                }}
                className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                disabled={addRowMutation.isPending}
              >
                {addRowMutation.isPending ? "Adding..." : "Add"}
              </button>
            </td>
          </tr>
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

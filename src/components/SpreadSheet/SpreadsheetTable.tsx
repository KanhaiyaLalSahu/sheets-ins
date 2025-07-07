import React, { useMemo, useState } from "react";
import { useSpreadsheetDataStore } from "../../store/useSpreadsheetDataStore";
import { useSearchStore } from "../../store/searchStore";
import { useSortStore } from "../../store/sortStore";
import { useColumnVisibilityStore } from "../../store/columnVisibilityStore";
import { Plus } from "lucide-react"; // For the + icon
import Modal from "./Modal";

export const SpreadsheetTable: React.FC = () => {
  const { data } = useSpreadsheetDataStore();
  const { query } = useSearchStore();
  const { column: sortColumn, ascending } = useSortStore();
  const { hiddenColumns } = useColumnVisibilityStore();

  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const allColumns = useMemo(() => {
    if (data.length === 0) return [];
    const keys = new Set<string>();
    data.forEach((row) => Object.keys(row).forEach((k) => keys.add(k)));
    return Array.from(keys);
  }, [data]);

  const visibleColumns = allColumns.filter((k) => !hiddenColumns.includes(k));

const sortedData = useMemo(() => {
  if (!sortColumn) return data;
  return [...data].sort((a, b) => {
    const aVal = String(a[sortColumn] ?? "").toLowerCase();
    const bVal = String(b[sortColumn] ?? "").toLowerCase();
    if (aVal < bVal) return ascending ? -1 : 1;
    if (aVal > bVal) return ascending ? 1 : -1;
    return 0;
  });
}, [data, sortColumn, ascending]);


  const filteredData = useMemo(() => {
    if (!query.trim()) return sortedData;
    return sortedData.filter((row) =>
      Object.values(row).some((val) =>
        String(val ?? "").toLowerCase().includes(query.trim().toLowerCase())
      )
    );
  }, [sortedData, query]);

  return (
    <div className="overflow-x-auto bg-white">
      <table className="border-collapse w-full min-w-max">
        <thead className="sticky top-0 z-10 bg-gray-50">
          <tr>
            {/* # column */}
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
            {/* Last + column */}
            <th className="w-[120px] px-2 py-1 border border-gray-200 text-center">
              <Plus className="w-4 h-4 inline" />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              {/* # */}
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
              {/* Blank cell */}
              <td className="border border-gray-200" />
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
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

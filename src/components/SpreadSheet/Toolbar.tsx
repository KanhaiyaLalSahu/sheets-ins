import React, { useState } from "react";
import { EyeOff, ArrowUpDown, X } from "lucide-react";
import { useSortStore } from "../../store/sortStore";
import { useSpreadsheetDataStore } from "../../store/useSpreadsheetDataStore";
import { useColumnVisibilityStore } from "../../store/columnVisibilityStore";
import ActionToolbar from "./ActionToolbar";

export const Toolbar: React.FC = () => {
  const { data } = useSpreadsheetDataStore();
  const { hiddenColumns, toggleColumn } = useColumnVisibilityStore();
  const { column: sortColumn, ascending, setSort } = useSortStore();

  const [search, setSearch] = useState("");
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  const allColumns = React.useMemo(() => {
    if (data.length === 0) return [];
    const keys = new Set<string>();
    data.forEach((row) => Object.keys(row).forEach((k) => keys.add(k)));
    return Array.from(keys);
  }, [data]);

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 border-b relative">
      <div className="flex items-center space-x-2">
        {/* Hide fields */}
        <div className="relative">
          <button
            onClick={() => setShowColumnMenu(!showColumnMenu)}
            className="flex items-center px-3 py-1.5 text-sm border-gray-300 rounded hover:bg-gray-100"
          >
            <EyeOff className="w-4 h-4" />
            <span>Hide fields</span>
          </button>
          {showColumnMenu && (
            <div className="absolute top-10 left-0 z-50 bg-white border rounded shadow p-3 w-60">
              <div className="flex justify-between mb-2">
                <div className="text-xs font-semibold">Hide columns</div>
                <button
                  onClick={() => setShowColumnMenu(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <input
                type="text"
                placeholder="Search"
                className="mb-2 w-full border rounded px-2 py-1 text-xs"
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {allColumns
                  .filter((k) =>
                    k.toLowerCase().includes(search.trim().toLowerCase())
                  )
                  .map((k) => (
                    <div
                      key={k}
                      className="flex justify-between text-sm py-1"
                    >
                      <span>{k}</span>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!hiddenColumns.includes(k)}
                          onChange={() => toggleColumn(k)}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-gray-200 rounded-full peer-checked:bg-blue-500 relative">
                          <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-4" />
                        </div>
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Sort */}
        <div className="relative">
          <button
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="flex items-center px-3 py-1.5 text-sm border-gray-300 rounded hover:bg-gray-100"
          >
            <ArrowUpDown className="w-4 h-4" />
            <span>Sort</span>
          </button>
          {showSortMenu && (
            <div className="absolute top-10 left-0 z-50 w-48 bg-white border rounded shadow">
              <div className="flex justify-between px-3 py-2 border-b">
                <div className="text-xs font-semibold">Sort by</div>
                <button
                  onClick={() => setShowSortMenu(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {allColumns.map((k) => (
                <React.Fragment key={k}>
                  <button
                    onClick={() => {
                      setSort(k, true);
                      setShowSortMenu(false);
                    }}
                    className="flex w-full px-3 py-1 text-xs hover:bg-gray-100"
                  >
                    🔼 {k} (Asc)
                  </button>
                  <button
                    onClick={() => {
                      setSort(k, false);
                      setShowSortMenu(false);
                    }}
                    className="flex w-full px-3 py-1 text-xs hover:bg-gray-100"
                  >
                    🔽 {k} (Desc)
                  </button>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Toolbar */}
      <ActionToolbar />
    </div>
  );
};

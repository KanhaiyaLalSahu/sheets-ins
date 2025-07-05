import React, { useState } from "react";
import {
  EyeOff,
  ArrowUpDown,
  ListFilter,
  ChevronsRight,
  X,
} from "lucide-react";
import Shape from "../../assets/Shape.svg";
import { useSortStore } from "../../store/sortStore";
import { columns } from "./data/SpreadSheetData";
import { useColumnVisibilityStore } from "../../store/columnVisibilityStore";
import { useFilterStore } from "../../store/filterStore";
import ActionToolbar from "./ActionToolbar";
export const Toolbar: React.FC = () => {
  const { setSort } = useSortStore();
  const { hiddenColumns, toggleColumn } = useColumnVisibilityStore();
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const {
    status,
    setStatus,
    priority,
    setPriority,
    setDueDateRange,
    setEstValueRange,
  } = useFilterStore();

  const [dueStart, setDueStart] = useState("");
  const [dueEnd, setDueEnd] = useState("");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [search, setSearch] = useState("");
  const [showSortMenu, setShowSortMenu] = useState(false);


  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200 relative">
      <div className="flex items-center space-x-1">
        <span className="text-sm font-medium">Tool bar</span>
        <ChevronsRight className="w-5 h-5 mt-1" />
        <div className="h-5 border-l border-gray-300 mx-2"></div>
        <div className="flex items-center space-x-2 ml-4 relative">
          {/* Hide fields */}
          <div className="relative">
            <button
              onClick={() => setShowColumnMenu(!showColumnMenu)}
              className="flex items-center space-x-1 px-3 py-1.5 text-sm border-gray-300 rounded hover:bg-gray-100"
            >
              <EyeOff className="w-4 h-4" />
              <span>Hide fields</span>
            </button>

            {showColumnMenu && (
              <div className="absolute top-10 left-0 z-50 bg-white border border-gray-200 rounded shadow-md p-3 w-60">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-xs font-semibold text-gray-600">
                    Hide columns
                  </div>
                  <button
                    onClick={() => setShowColumnMenu(false)}
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>

                {/* Search input */}
                <input
                  type="text"
                  placeholder="Search"
                  className="mb-2 w-full border border-gray-300 rounded px-2 py-1 text-xs"
                  onChange={(e) => setSearch(e.target.value)}
                />

                {/* List of toggles */}
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {columns
                    .filter((col) =>
                      col.header
                        .toLowerCase()
                        .includes(search.trim().toLowerCase())
                    )
                    .map((col) => (
                      <div
                        key={col.id}
                        className="flex items-center justify-between text-sm py-1"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-600">
                            {/* you can put icon here */}
                          </span>
                          <span>{col.header}</span>
                        </div>
                        <label className="inline-flex relative items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!hiddenColumns.includes(col.id)}
                            onChange={() => toggleColumn(col.id)}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4"></div>
                        </label>
                      </div>
                    ))}
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-3">
                  <button
                    onClick={() =>
                      columns.forEach((c) => toggleColumn(c.id, false))
                    }
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Hide all
                  </button>
                  <button
                    onClick={() =>
                      columns.forEach((c) => toggleColumn(c.id, true))
                    }
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Show all
                  </button>
                </div>
              </div>
            )}
          </div>

            {/* Sort */}
{/* Sort */}
<div className="relative">
  <button
    onClick={() => setShowSortMenu(!showSortMenu)}
    className="flex items-center space-x-1 px-3 py-1.5 text-sm border-gray-300 rounded hover:bg-gray-100"
  >
    <ArrowUpDown className="w-4 h-4" />
    <span>Sort</span>
  </button>

  {showSortMenu && (
    <div className="absolute top-10 left-0 z-50 w-48 bg-white border border-gray-200 rounded shadow-md">
      <div className="flex items-center justify-between px-3 py-2 border-b">
        <div className="text-xs font-semibold text-gray-600">Sort by</div>
        <button
          onClick={() => setShowSortMenu(false)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>
      <button
        onClick={() => {
          setSort("asc");
          setShowSortMenu(false);
        }}
        className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100"
      >
        <span className="mr-2">🔼</span>
        Sort ascending
      </button>
      <button
        onClick={() => {
          setSort("desc");
          setShowSortMenu(false);
        }}
        className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100"
      >
        <span className="mr-2">🔽</span>
        Sort descending
      </button>
    </div>
  )}
</div>


          {/* Filters  */}
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="flex items-center space-x-1 px-3 py-1.5 text-sm border-gray-300 rounded hover:bg-gray-100"
            >
              <ListFilter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            {showFilterMenu && (
              <div className="absolute top-10 left-0 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-3 w-72 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-semibold text-gray-800">
                    Filters
                  </div>
                  <button
                    onClick={() => setShowFilterMenu(false)}
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="text-xs font-semibold text-gray-600 mb-1">
                    Status
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {[
                      "All",
                      "In-progress",
                      "Need to start",
                      "Complete",
                      "Blocked",
                    ].map((s) => (
                      <button
                        key={s}
                        onClick={() => setStatus(s)}
                        className={`text-xs px-2 py-1 rounded border ${
                          status === s
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-transparent hover:bg-gray-100"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="text-xs font-semibold text-gray-600 mb-1">
                    Priority
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {["All", "High", "Medium", "Low"].map((p) => (
                      <button
                        key={p}
                        onClick={() => setPriority(p)}
                        className={`text-xs px-2 py-1 rounded border ${
                          priority === p
                            ? "border-green-500 bg-green-50 text-green-700"
                            : "border-transparent hover:bg-gray-100"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs font-semibold text-gray-600">
                      Due Date Range
                    </div>
                    <button
                      onClick={() => {
                        setDueStart("");
                        setDueEnd("");
                        setDueDateRange(null);
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                      title="Reset Date Range"
                    >
                      <X className="w-3 h-3 text-gray-500" />
                    </button>
                  </div>
                  <div className="flex space-x-1">
                    <input
                      type="date"
                      value={dueStart}
                      onChange={(e) => setDueStart(e.target.value)}
                      className="border border-gray-300 rounded text-xs p-1 w-1/2"
                    />
                    <input
                      type="date"
                      value={dueEnd}
                      onChange={(e) => setDueEnd(e.target.value)}
                      className="border border-gray-300 rounded text-xs p-1 w-1/2"
                    />
                  </div>
                  <button
                    onClick={() =>
                      setDueDateRange(
                        dueStart && dueEnd ? [dueStart, dueEnd] : null
                      )
                    }
                    className="mt-2 w-full text-xs bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
                  >
                    Apply Date Range
                  </button>
                </div>

                <div className="border-t border-gray-200 pt-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs font-semibold text-gray-600">
                      Est. Value Range
                    </div>
                    <button
                      onClick={() => {
                        setMinValue("");
                        setMaxValue("");
                        setEstValueRange(null);
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                      title="Reset Value Range"
                    >
                      <X className="w-3 h-3 text-gray-500" />
                    </button>
                  </div>
                  <div className="flex space-x-1">
                    <input
                      type="number"
                      placeholder="Min"
                      value={minValue}
                      onChange={(e) => setMinValue(e.target.value)}
                      className="border border-gray-300 rounded text-xs p-1 w-1/2"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={maxValue}
                      onChange={(e) => setMaxValue(e.target.value)}
                      className="border border-gray-300 rounded text-xs p-1 w-1/2"
                    />
                  </div>
                  <button
                    onClick={() =>
                      setEstValueRange(
                        minValue && maxValue
                          ? [parseInt(minValue), parseInt(maxValue)]
                          : null
                      )
                    }
                    className="mt-2 w-full text-xs bg-green-500 text-white py-1 rounded hover:bg-green-600"
                  >
                    Apply Value Range
                  </button>
                </div>
              </div>
            )}
          </div>

          <button className="flex items-center space-x-1 px-3 py-1.5 text-sm border-gray-300 rounded hover:bg-gray-100">
            <img src={Shape} alt="Cell view" />
            <span>Cell view</span>
          </button>
        </div>
      </div>
      {/* Action Toolbar */}
      <ActionToolbar />
    </div>
  );
};

import React from "react";
import { ChevronDown } from "lucide-react";
import { useSearchStore } from "../../store/searchStore";
import { useSortStore } from "../../store/sortStore";
import { tasks, columns, columnGroups } from "./data/SpreadSheetData";
import { useColumnVisibilityStore } from "../../store/columnVisibilityStore";
import { useFilterStore } from "../../store/filterStore";

export const SpreadsheetTable: React.FC = () => {
  const { query } = useSearchStore();
const { ascending } = useSortStore();
const { status, priority, dueDateRange, estValueRange } = useFilterStore();

// Get visible columns, excluding hidden ones
const { hiddenColumns } = useColumnVisibilityStore();
const visibleColumns = columns.filter(
  (col) => col.visible && !hiddenColumns.includes(col.id)
);
// First, sort:
const sortedTasks = [...tasks].sort((a, b) => {
  const aVal = a.jobRequest.toLowerCase();
  const bVal = b.jobRequest.toLowerCase();
  if (aVal < bVal) return ascending ? -1 : 1;
  if (aVal > bVal) return ascending ? 1 : -1;
  return 0;
});

const filteredTasks = sortedTasks.filter((task) => {
  // Search filter
  const matchesQuery = !query.trim() || Object.values(task).some((value) =>
    String(value).toLowerCase().includes(query.trim().toLowerCase())
  );

  // Status filter
  const matchesStatus = status === "All" || task.status === status;

  // Priority filter
  const matchesPriority = priority === "All" || task.priority === priority;

  // Due date filter
  const matchesDueDate =
    !dueDateRange ||
    (new Date(task.dueDate.split("-").reverse().join("-")) >= new Date(dueDateRange[0]) &&
     new Date(task.dueDate.split("-").reverse().join("-")) <= new Date(dueDateRange[1]));

  // Est. value filter
  const numericEstValue = parseInt(task.estValue.replace(/,/g, ""));
  const matchesEstValue =
    !estValueRange ||
    (numericEstValue >= estValueRange[0] && numericEstValue <= estValueRange[1]);

  return matchesQuery && matchesStatus && matchesPriority && matchesDueDate && matchesEstValue;
});



  return (
    <div className="flex-1 overflow-auto bg-white">
      <div className="min-w-max">
        {/* Group headers */}
        <div className="flex border-b border-gray-200 sticky top-0 z-20">
          <div className="w-12 flex-shrink-0 border-r border-gray-200 bg-white" />
          {columnGroups.map((group) => {
            const groupCols = visibleColumns.filter((c) =>
              group.columnIds.includes(c.id)
            );
            if (groupCols.length === 0) return null;
            const width = groupCols.reduce((sum, c) => sum + c.width, 0);
            return (
              <div
                key={group.id}
                className="flex items-center px-3 py-1 font-semibold text-sm"
                style={{
                  width,
                  minWidth: width,
                  backgroundColor: group.color,
                }}
              >
                {group.label}
              </div>
            );
          })}
        </div>

        {/* Column headers */}
        <div className="flex border-b border-gray-200 sticky top-8 z-10">
          <div className="w-12 flex-shrink-0 flex items-center justify-center border-r border-gray-200 bg-gray-50">
            <span className="text-xs text-gray-500">#</span>
          </div>
          {visibleColumns.map((column) => (
            <div
              key={column.id}
              className={`flex items-center px-3 py-2 border-r border-gray-200 ${
                column.accessor === "url" ? "bg-white" : "bg-gray-50"
              }`}
              style={{ width: column.width, minWidth: column.width }}
            >
              <span className="text-sm font-medium text-gray-700 truncate">
                {column.header}
              </span>
              <ChevronDown className="w-3 h-3 text-gray-400 ml-1" />
            </div>
          ))}
        </div>

        {/* Data rows */}
        {filteredTasks.map((task, rowIndex) => (
          <div key={task.id} className="flex hover:bg-gray-50">
            <div className="w-12 flex-shrink-0 flex items-center justify-center border-r border-gray-200 bg-gray-50">
              <span className="text-xs text-gray-500">{rowIndex + 1}</span>
            </div>
            {visibleColumns.map((column) => (
              <div
                key={`${task.id}-${column.id}`}
                className="border-r border-b border-gray-200 flex items-center px-3 py-1 truncate"
                style={{
                  width: column.width,
                  minWidth: column.width,
                  height: 40,
                }}
              >
                <span className="text-sm text-gray-800 truncate">
                  {task[column.accessor]}
                </span>
              </div>
            ))}
          </div>
        ))}

        {/* Empty rows */}
        {Array.from({ length: 10 }, (_, i) => (
          <div key={`empty-${i}`} className="flex">
            <div className="w-12 flex-shrink-0 flex items-center justify-center border-r border-gray-200 bg-gray-50">
              <span className="text-xs text-gray-400">{filteredTasks.length + i + 1}</span>
            </div>
            {visibleColumns.map((column) => (
              <div
                key={`empty-${i}-${column.id}`}
                className="border-r border-b border-gray-200"
                style={{
                  width: column.width,
                  minWidth: column.width,
                  height: 40,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

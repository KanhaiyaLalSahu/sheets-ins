import React, { useRef } from "react";
import Papa from "papaparse";
import Import from "../../assets/Arrow.svg";
import Export from "../../assets/Arrow Upload.svg";
import Split from "../../assets/Arrow Split.svg";
import Share from "../../assets/Share.svg";
import { useSpreadsheetDataStore } from "../../store/useSpreadsheetDataStore";
import { useColumnVisibilityStore } from "../../store/columnVisibilityStore";

export function ActionToolbar() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { data, setData } = useSpreadsheetDataStore();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      alert("Please select a CSV file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === "string") {
        const parsed = Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
        });
        if (parsed.errors.length) {
          console.error("CSV Parse Errors:", parsed.errors);
          alert("Failed to parse CSV.");
          return;
        }

        const newData = parsed.data as Record<string, string>[];
        setData(newData); // Update Zustand store with imported data
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  };

const handleExport = () => {
  const { hiddenColumns } = useColumnVisibilityStore.getState();

  if (data.length === 0) {
    alert("No data to export.");
    return;
  }

  // Filter out hidden fields and convert all values to strings
  const visibleData = data.map((row) => {
    const filteredRow: Record<string, string> = {};
    Object.entries(row).forEach(([key, value]) => {
      if (!hiddenColumns.includes(key)) {
        // Convert value to string safely
        filteredRow[key] = value !== null && value !== undefined ? String(value) : "";
      }
    });
    return filteredRow;
  });

  const csv = Papa.unparse(visibleData);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", "spreadsheet_export.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  return (
    <div className="flex items-center space-x-2">
      {/* Import */}
      <div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center space-x-1 px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-100"
        >
          <img src={Import} alt="" />
          <span>Import</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Export */}
      <button
        onClick={handleExport}
        className="flex items-center space-x-1 px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-100"
      >
        <img src={Export} alt="" />
        <span>Export</span>
      </button>

      {/* Share */}
      <button className="flex items-center space-x-1 px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-100">
        <img src={Share} alt="" />
        <span>Share</span>
      </button>

      {/* New Action */}
      <button className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-[#4B6A4F] text-white rounded hover:bg-green-700">
        <img src={Split} alt="" />
        <span>New Action</span>
      </button>
    </div>
  );
}

export default ActionToolbar;

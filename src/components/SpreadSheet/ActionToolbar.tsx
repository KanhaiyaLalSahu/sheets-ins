import React, { useRef, useState } from "react";
import Import from "../../assets/Arrow.svg";
import Export from "../../assets/Arrow Upload.svg";
import Split from "../../assets/Arrow Split.svg";
import Share from "../../assets/Share.svg";
import Papa from "papaparse";
import { useSpreadsheetDataStore } from "../../store/useSpreadsheetDataStore";
import { useColumnVisibilityStore } from "../../store/columnVisibilityStore";
import { useIngestCsv } from "../../hooks/uploadCSV";
import { useNewActionModal } from "../../store/useNewActionModal";
import { NewActionModal } from "../ActionModal/NewActionModal"; 
// import { useNavigate } from "react-router-dom";

export function ActionToolbar() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { data } = useSpreadsheetDataStore();
  const uploadCsvMutation = useIngestCsv();
  const { hiddenColumns } = useColumnVisibilityStore();
// const navigate = useNavigate();

  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      console.warn("Please select a CSV file.");
      // Show toast here instead of alert
      return;
    }

    setUploading(true);
    uploadCsvMutation.mutate(file, {
      onSuccess: () => {
        console.log("CSV uploaded successfully!");
        // Show success toast here
      },
      onError: (err) => {
        console.error("Upload error:", err);
        // Show error toast here
      },
      onSettled: () => {
        setUploading(false);
      },
    });

    event.target.value = "";
  };

  const handleExport = () => {
    console.log("Exporting data...");
    if (data.length === 0) {
      console.warn("No data to export.");
      // Show toast here
      return;
    }

    const visibleData = data.map((row) => {
      const filteredRow: Record<string, string> = {};
      Object.entries(row).forEach(([key, value]) => {
        if (!hiddenColumns.includes(key)) {
          filteredRow[key] =
            value !== null && value !== undefined ? String(value) : "";
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

    console.log("Export completed.");
    // Show success toast here
  };

  return (
    <>
       <div className="flex items-center space-x-2">
      {/* Import */}
      <div className="relative">
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className={`flex items-center space-x-1 px-3 py-1.5 text-sm border border-gray-300 rounded ${
            uploading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
          }`}
        >
          <img src={Import} alt="" />
          <span>{uploading ? "Uploading..." : "Import"}</span>
          {uploading && (
            <svg
              className="ml-2 animate-spin h-4 w-4 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          )}
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
      <button
  onClick={() => {
  useNewActionModal.getState().open();
  // navigate("/modal"); // Navigate to /modal to trigger routing
}}
  className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-[#4B6A4F] text-white rounded hover:bg-green-700"
>
  <img src={Split} alt="" />
  <span>New Action</span>
</button>
      {/* Display ingestion info */}
    </div>
      <NewActionModal />
    </>
     
  );
}

export default ActionToolbar;


import React, { useState } from "react";
import { X, ArrowLeft } from "lucide-react";
import { useNewActionModal } from "../../store/useNewActionModal";
import { useSpreadsheetDataStore } from "../../store/useSpreadsheetDataStore";
import { useIngestionStore } from "../../store/new/useIngestionStore";
import { useSelectedSheetStore } from "../../store/useSelectedSheetStore";
import Modal from "./Modal";

export function StepFinalForm() {
  const {
    close,
    reset,
    setStep,
    prompt,
    setPrompt,
    selectedColumns,
    toggleColumn,
    columnsToMigrate,
    toggleMigrateColumn,
    newSheet,
    setNewSheet,
    columnName,
    setColumnName,
    description,
    setDescription,
    outputFormat,
    setOutputFormat,
    actionName,
    actionId,
  } = useNewActionModal();

  const ingestionId = useIngestionStore((s) => s.ingestionId);
  const sourceSheetNumber = useSelectedSheetStore((s) => s.selectedSheet);
  const { headers, data } = useSpreadsheetDataStore();

  const [showColumnPicker, setShowColumnPicker] = useState(false);

  const handleSubmit = () => {
    const rowsAsArrays = data.map((row) =>
      headers.map((header) => String(row[header] ?? ""))
    );

    const payload = {
      ingestionId,
      prompt,
      selectedColumns,
      tableData: {
        headers,
        rows: rowsAsArrays,
      },
      newSheet,
      sourceSheetNumber,
      columnName,
      description,
      outputFormat,
      columnsToMigrate,
      actionName,
      actionId,
    };

    console.log("Submitting:", payload);

    // TODO: send payload to your API here

    close();
    reset(); // ✅ clear the form after closing
  };

  return (
    <div className="w-[500px] mx-auto bg-white border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="bg-sheet-green text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ArrowLeft
            className="w-5 h-5 cursor-pointer hover:bg-green-700 rounded"
            onClick={() => setStep(2)}
          />
          <h2 className="text-sm font-medium">Generate Content</h2>
        </div>
        <X
          className="w-5 h-5 cursor-pointer hover:bg-green-700 rounded"
          onClick={close}
        />
      </div>

      <div className="p-4 space-y-4">
        {/* Prompt */}
        <div className="border-2 border-dashed border-blue-200 rounded-lg p-3">
          <h3 className="text-sm font-medium mb-1">Prompt</h3>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type @ to reference a column..."
            className="w-full border border-gray-300 rounded p-2 text-sm resize-none"
            rows={4}
            onKeyDown={(e) => {
              if (e.key === "@") {
                e.preventDefault();
                setShowColumnPicker(true);
              }
            }}
          />
          <div className="text-xs text-gray-500 mt-1">
            To preview, add at least one field.
          </div>
        </div>

        {/* Sheet Selection */}
        <div className="border-2 border-dashed border-blue-200 rounded-lg p-3 space-y-3">
          <div className="flex gap-2 w-full justify-between">
            <button
              onClick={() => setNewSheet(false)}
              className={`px-3 py-1 rounded text-sm w-full border ${
                !newSheet
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Existing Sheet
            </button>
            <button
              onClick={() => setNewSheet(true)}
              className={`px-3 py-1 rounded text-sm w-full border ${
                newSheet
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              New Sheet
            </button>
          </div>

          <div className="flex gap-1">
            <input
              value={columnName}
              onChange={(e) => setColumnName(e.target.value)}
              placeholder="Column name"
              className="w-full p-2 border border-gray-300 rounded text-sm"
            />
            <select
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            >
              <option value="">Output format...</option>
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="markdown">Markdown</option>
              <option value="html">HTML</option>
              <option value="json">JSON</option>
            </select>
          </div>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            className="w-full h-16 p-2 border border-gray-300 rounded text-sm"
          />
        </div>

        {/* Columns */}
        <div className="border-2 border-dashed border-blue-200 rounded-lg p-3">
          <h3 className="text-sm font-medium mb-2">Columns to Migrate</h3>
          <div className="space-y-1">
            {headers.map((col) => (
              <label key={col} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={columnsToMigrate.includes(col)}
                  onChange={() => toggleMigrateColumn(col)}
                />
                <span>{col}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          <button
            onClick={() => setStep(2)}
            className="px-4 py-2 border border-gray-300 text-sm rounded hover:bg-gray-50"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-sheet-green text-white text-sm rounded hover:bg-green-700"
          >
            Run
          </button>
        </div>
      </div>

      {/* Column Picker Modal */}
      {showColumnPicker && (
        <Modal onClose={() => setShowColumnPicker(false)}>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">Insert Column</h2>
            <div className="space-y-1">
              {headers.map((col) => (
                <div
                  key={col}
                  onClick={() => {
                    setPrompt(`${prompt}@${col} `);
                    if (!selectedColumns.includes(col)) {
                      toggleColumn(col);
                    }
                    setShowColumnPicker(false);
                  }}
                  className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                >
                  {col}
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

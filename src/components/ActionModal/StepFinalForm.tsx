import { X, ArrowLeft, Settings, Plus } from "lucide-react";
import { useNewActionModal } from "../../store/useNewActionModal";
import type { FormEvent } from "react";
import { useState } from "react";

export function StepFinalForm() {
  const {
    close,
    setStep,
    prompt,
    setPrompt,
    selectedColumns,
    toggleColumn,
    contentFormat,
    setContentFormat,
  } = useNewActionModal();

  const [newColumnName, setNewColumnName] = useState('');
  const [newColumnDescription, setNewColumnDescription] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Submitting data:", { prompt, selectedColumns, contentFormat });
    close();
  };

  const handleAddColumn = () => {
    if (newColumnName.trim()) {
      console.log('Adding column:', newColumnName, newColumnDescription);
      setNewColumnName('');
      setNewColumnDescription('');
    }
  };

  const availableColumns = [
    "Name",
    "Development Stage",
    "Overview",
    "Schedule",
    "Last Updated",
    "Checklist",
    "Submitter",
  ];

  return (
    <div onSubmit={handleSubmit} className="w-full mx-auto bg-white border border-gray-200 shadow-sm">
      <div className="bg-sheet-green text-white px-4 py-3 flex items-center justify-between ">
        <div className="flex items-center gap-2">
       
          <h2 className="text-sm font-medium">New Action</h2>
        </div>
        <X className="w-5 h-5 cursor-pointer hover:bg-green-700 rounded" onClick={close} />
      </div>

      <div className="p-4 space-y-6">
        {/* Prompt Section */}
        <div className="border-2 border-dashed border-blue-200 rounded-lg p-3">
          <h3 className="text-sm font-medium mb-1">Prompt</h3>
          <p className="text-xs text-gray-600 mb-2">
            Write clear, context-rich detailed prompts for the best results.
          </p>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Your prompt here..."
            className="w-full border border-gray-300 rounded p-2 text-sm resize-none"
            rows={4}
          />
          <div className="text-xs text-gray-500 mt-1">
            Type @ to reference a column.
          </div>
          <div className="text-xs text-gray-500 mt-1">
            To add a preview, make sure to add at least one field to the prompt.
          </div>
          <button type="button" className="mt-2 text-blue-600 text-sm font-medium hover:underline">
            + Add content
          </button>
        </div>

        {/* Sheet Selection */}
        <div className="border-2 border-dashed border-blue-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium">Existing Sheet</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">New Linked Sheet</span>
              <div className="w-6 h-3 bg-gray-200 rounded-full relative">
                <div className="w-2 h-2 bg-white rounded-full absolute top-0.5 left-0.5 shadow"></div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">
                Column name *
              </label>
              <input
                type="text"
                value={newColumnName}
                onChange={(e) => setNewColumnName(e.target.value)}
                placeholder="Product Name"
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Output format *
              </label>
              <select
                value={contentFormat}
                onChange={(e) => setContentFormat(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select format...</option>
                <option value="text">Text</option>
                <option value="markdown">Markdown</option>
                <option value="html">HTML</option>
                <option value="json">JSON</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description (optional)
              </label>
              <textarea
                value={newColumnDescription}
                onChange={(e) => setNewColumnDescription(e.target.value)}
                placeholder="This helps the AI generate more accurate results"
                className="w-full h-16 p-2 border border-gray-300 rounded-md resize-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleAddColumn}
                className="mt-2 flex items-center gap-1 text-blue-600 text-sm font-medium hover:underline"
              >
                <Plus size={14} />
                Add a column
              </button>
            </div>
          </div>
        </div>

        {/* Financial Overview Section */}
        <div className="border-2 border-dashed border-blue-200 rounded-lg p-3">
          <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            Financial Overview
          </h3>
          <div className="space-y-1">
            {availableColumns.map((col) => (
              <label key={col} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-1 py-1 rounded">
                <input
                  type="checkbox"
                  checked={selectedColumns.includes(col)}
                  onChange={() => toggleColumn(col)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className={`text-sm ${selectedColumns.includes(col) ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
                  {col}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={() => setStep(2)}
            className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
          >
            Back
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() =>
                console.log("Preview:", { prompt, selectedColumns, contentFormat })
              }
              className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
            >
              Preview
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-sheet-green text-white text-sm rounded hover:bg-green-700"
            >
              Run
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
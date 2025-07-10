import React from "react";
import {
  X,
  ArrowLeft,
  Search,
  Plus,
  Settings,
  Image,
  Type,
  RotateCcw,
} from "lucide-react";
import { useNewActionModal } from "../../store/useNewActionModal";

export default function StepGenerateContent() {
  const { setStep, setContentFormat, close } = useNewActionModal();

  const generators = [
    {
      label: "Generate Content",
      description: "Combines multiple input texts using a given format",
      icon: <Type className="w-5 h-5 text-gray-600" />,
    },
    {
      label: "Generate Image",
      description: "Find and replace words in input text",
      icon: <Image className="w-5 h-5 text-gray-600" />,
    },
    {
      label: "Extract Text",
      description: "Format text based off a specified formatter",
      icon: <Type className="w-5 h-5 text-gray-600" />,
    },
    {
      label: "Rewrite Text",
      description: "Split text into a list based on a specific character",
      icon: <RotateCcw className="w-5 h-5 text-gray-600" />,
    },
  ];

  return (
    <div className="w-full mx-auto bg-white border border-gray-200 rounded-md ">
      <div className="bg-sheet-green text-white px-4 py-3 flex items-center justify-between ">
        <h2 className="text-sm font-medium">New Action</h2>
        <X className="w-5 h-5 cursor-pointer hover:bg-green-700 rounded" onClick={close} />
      </div>

      <div className="p-4 space-y-4">
        <div className="flex items-center gap-3 p-3 border-2 border-dashed border-blue-300 rounded-md bg-blue-50">
          <button onClick={() => setStep(1)} className="p-1 hover:bg-blue-100 rounded">
            <ArrowLeft className="w-4 h-4 text-blue-600" />
          </button>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-600" />
            <div>
              <h3 className="text-sm font-medium text-gray-900">AI</h3>
              <p className="text-xs text-gray-500">
                Add smart automations like summarizing and extracting
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search within text formatting"
            className="w-full border border-gray-300 rounded-md py-2.5 pl-10 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="absolute right-3 top-2.5">
            <Plus className="w-5 h-5 text-gray-400 bg-gray-100 rounded p-1" />
          </div>
        </div>

        <div className="space-y-2">
          {generators.map((item) => (
            <div
              key={item.label}
              onClick={() => {
                setContentFormat(item.label);
                setStep(3);
              }}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-md transition-all hover:bg-green-50 hover:border-sheet-green border border-gray-200 cursor-pointer hover:shadow"
            >
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center border">
                {item.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">{item.label}</h4>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// src/components/Spreadsheet.tsx
import React from "react";
import { Toolbar } from "./Toolbar";
import { SpreadsheetTable } from "./SpreadsheetTable";
export const Spreadsheet: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full bg-white border border-gray-200 rounded">
      <Toolbar />
      <SpreadsheetTable />
    </div>
  );
};

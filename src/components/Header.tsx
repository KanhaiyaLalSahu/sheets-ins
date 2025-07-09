import React from "react";
import { Search, Bell, Menu, X } from "lucide-react";
import { useSearchStore } from "../store/searchStore";
import closedPanel from "../assets/sidebar/closedPanel.svg"; 
import OpenPanel from "../assets/sidebar/openPanel.svg"; 
interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const { query, setQuery } = useSearchStore();

  return (
    <div className="flex items-center justify-between p-3 bg-white border-b border-gray-200">
      <div className="flex items-center space-x-2">
        <button
          onClick={onToggleSidebar}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          {isSidebarOpen ? (
            <img src={OpenPanel} alt="X" />
          ) : (
            <img src={closedPanel} alt="=" />
          )}
        </button>
        <span className="text-sm text-gray-600">Workspace</span>
        <span className="text-gray-400">›</span>
        <span className="text-sm text-gray-600">Folder 2</span>
        <span className="text-gray-400">›</span>
        <span className="text-sm font-medium">Spreadsheet 3</span>
        <span className="text-sm text-gray-600">...</span>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search within sheet"
            className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative">
          <Bell className="w-6 h-6 text-gray-800" />
          <span className="absolute -top-2 -right-2 bg-[#4B6A4F] text-white text-xs w-5 h-5 border-2 rounded-full flex items-center justify-center p-1">
            2
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <img
            src="https://i.pravatar.cc/32?img=3"
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-800">John Doe</span>
            <span className="text-xs text-gray-500 truncate">
              john.doe@example.com
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
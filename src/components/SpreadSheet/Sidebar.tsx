import React, { useState } from "react";
import { 
  ChevronDown, 
  ChevronRight, 
  FileText, 
  Plus, 
  Search,
  Settings,
  HelpCircle,
  Users
} from "lucide-react";
import SearchSvg from "../../assets/sidebar/search.svg";
import Community from "../../assets/sidebar/Community.svg";
interface SidebarProps {
  isOpen: boolean;
}

interface FolderItem {
  id: string;
  name: string;
  type: 'folder' | 'spreadsheet';
  children?: FolderItem[];
  isExpanded?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(['folder1', 'folder2'])
  );

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const sidebarData: FolderItem[] = [
    {
      id: 'favorites',
      name: 'FAVORITES',
      type: 'folder',
      children: [
        { id: 'sheet-abc', name: 'Sheet ABC', type: 'spreadsheet' },
        { id: 'page-def', name: 'Page DEF', type: 'spreadsheet' }
      ]
    },
    {
      id: 'general',
      name: 'GENERAL',
      type: 'folder',
      children: [
        { id: 'spreadsheet1', name: 'Spreadsheet 1', type: 'spreadsheet' },
        {
          id: 'folder1',
          name: 'Folder 1',
          type: 'folder',
          children: []
        },
        {
          id: 'folder2',
          name: 'Folder 2',
          type: 'folder',
          children: [
            { id: 'spreadsheet2', name: 'Spreadsheet 2', type: 'spreadsheet' },
            { id: 'spreadsheet3', name: 'Spreadsheet 3', type: 'spreadsheet' },
            { id: 'spreadsheet4-1', name: 'Spreadsheet 4', type: 'spreadsheet' },
            { id: 'spreadsheet4-2', name: 'Spreadsheet 4', type: 'spreadsheet' },
            { id: 'spreadsheet4-3', name: 'Spreadsheet 4', type: 'spreadsheet' }
          ]
        }
      ]
    },
    {
      id: 'private',
      name: 'PRIVATE',
      type: 'folder',
      children: [
        { id: 'spreadsheet1-private', name: 'Spreadsheet 1', type: 'spreadsheet' },
        {
          id: 'folder1-private',
          name: 'Folder 1',
          type: 'folder',
          children: []
        },
        {
          id: 'folder3-private',
          name: 'Folder 3',
          type: 'folder',
          children: [
            { id: 'spreadsheet1-folder3', name: 'Spreadsheet 1', type: 'spreadsheet' },
            { id: 'spreadsheet1-folder3-2', name: 'Spreadsheet 1', type: 'spreadsheet' }
          ]
        }
      ]
    }
  ];

  const renderFolderItem = (item: FolderItem, level: number = 0) => {
    const isExpanded = expandedFolders.has(item.id);
    const hasChildren = item.children && item.children.length > 0;
    
    return (
      <div key={item.id}>
        <div
          className={`flex items-center py-1 px-2 hover:bg-gray-100 cursor-pointer ${
            level === 0 ? 'font-medium text-xs text-gray-500 uppercase tracking-wide' : ''
          }`}
          style={{ paddingLeft: `${8 + level * 16}px` }}
          onClick={() => hasChildren && toggleFolder(item.id)}
        >
          {hasChildren && (
            <div className="w-4 h-4 mr-1 flex items-center justify-center">
              {isExpanded ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </div>
          )}
          {!hasChildren && <div className="w-5 mr-1" />}
          
          {item.type === 'spreadsheet' && (
            <div className="w-4 h-4 mr-2 flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            </div>
          )}
          
          <span className={`text-sm ${level === 0 ? 'text-gray-500' : 'text-gray-700'}`}>
            {item.name}
          </span>
          
          {level === 0 && (
            <div className="ml-auto">
              <Plus className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            </div>
          )}
        </div>
        
        {hasChildren && isExpanded && (
          <div>
            {item.children?.map(child => renderFolderItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">I</span>
            </div>
            <span className="font-medium text-gray-900">Inscripts</span>
          </div>
        
        </div>
      </div>

      {/* New Sheet Button */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between gap-1">
        <button className="w-full bg-[#4B6A4F] text-white py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Sheet</span>
        </button>
        <div className="flex space-x-1">
  <button className="p-1 hover:bg-gray-100 rounded">
    <img src={Community} alt="C" height={72} width={72} />
  </button>
  <button className="p-1 hover:bg-gray-100 rounded">
    <img src={SearchSvg} alt="Find" height={72} width={72} />
  </button>
</div>

      </div>

      {/* Folder Structure */}
      <div className="flex-1 overflow-y-auto py-2">
        {sidebarData.map(item => renderFolderItem(item))}
      </div>

      {/* Team Section */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center space-x-2 text-sm text-gray-600 hover:bg-gray-100 p-2 rounded">
          <Users className="w-4 h-4" />
          <span>Create or join a team</span>
        </button>
      </div>

      {/* Credits and Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Credits used</span>
          <span className="float-right">100 / 2000</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
          <div className="bg-green-600 h-2 rounded-full" style={{ width: '5%' }}></div>
        </div>
        <div className="text-xs text-gray-500 mb-3">
          Your plan: <span className="font-medium">Professional</span>
        </div>
        <div className="flex flex-col space-y-2">
          <button className="flex items-center space-x-2 text-sm text-gray-600 hover:bg-gray-100 p-1 rounded">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
          <button className="flex items-center space-x-2 text-sm text-gray-600 hover:bg-gray-100 p-1 rounded">
            <HelpCircle className="w-4 h-4" />
            <span>Help</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

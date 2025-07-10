import {
  X,
  Search,
  Plus,
  Settings,
  Globe,
  FileText,
  BarChart3,
  MessageSquare,
  Mail,
  FileSpreadsheet,
  HardDrive,
} from "lucide-react";
import { useNewActionModal } from "../../store/useNewActionModal";

export default function StepSelectAction() {
  const { close, setStep, setSelectedOption } = useNewActionModal();

  const handleSelectAI = () => {
    setSelectedOption("AI");
    setStep(2);
  };

  const popularItems = [
    {
      title: "Apps",
      description: "Automate actions in apps like Gmail, Notion, and HubSpot",
      icon: <Settings className="w-5 h-5 text-orange-500" />,
      clickable: false,
      bgColor: "bg-orange-50",
    },
    {
      title: "AI",
      description: "Add smart automations like summarizing and extracting",
      icon: <Settings className="w-5 h-5 text-gray-600" />,
      clickable: true,
      bgColor: "bg-gray-50",
    },
    {
      title: "Web Scraping",
      description: "Get text or meta data from websites",
      icon: <Globe className="w-5 h-5 text-blue-500" />,
      clickable: false,
      bgColor: "bg-blue-50",
    },
    {
      title: "Text Formatting",
      description: "Format, convert, or take action on text data",
      icon: <FileText className="w-5 h-5 text-green-500" />,
      clickable: false,
      bgColor: "bg-green-50",
    },
    {
      title: "Data Visualization",
      description: "Create charts and graphs to represent data visually",
      icon: <BarChart3 className="w-5 h-5 text-purple-500" />,
      clickable: false,
      bgColor: "bg-purple-50",
    },
  ];

  const integrationItems = [
    {
      title: "Slack",
      description: "Send and receive slack messages",
      icon: <MessageSquare className="w-5 h-5 text-purple-600" />,
      clickable: false,
      bgColor: "bg-purple-50",
    },
    {
      title: "Gmail",
      description: "Read and send Gmail messages",
      icon: <Mail className="w-5 h-5 text-red-500" />,
      clickable: false,
      bgColor: "bg-red-50",
    },
    {
      title: "Google Sheets",
      description: "Read and write Google Sheet data",
      icon: <FileSpreadsheet className="w-5 h-5 text-green-600" />,
      clickable: false,
      bgColor: "bg-green-50",
    },
    {
      title: "Google Drive",
      description: "Access and manage Google Drive files",
      icon: <HardDrive className="w-5 h-5 text-blue-600" />,
      clickable: false,
      bgColor: "bg-blue-50",
    },
  ];

  return (
    <div className="w-full mx-auto bg-white border border-gray-200 shadow-sm ">
      {/* Header */}
      <div className="bg-sheet-green text-white px-4 py-3 flex items-center justify-between ">
        <h2 className="text-sm font-medium">New Action</h2>
        <X className="w-5 h-5 cursor-pointer hover:bg-green-700 rounded" onClick={close} />
      </div>

      <div className="p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search for integration, apps, tools, etc"
            className="w-full border bg-white border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {["Tasks", "Templates", "Documents", "People", "Projects"].map(
            (item) => (
              <button
                key={item}
                className="px-1 bg-gray-100 hover:bg-gray-200 rounded-sm text-sm text-gray-700 transition-colors"
              >
                {item}
              </button>
            )
          )}
        </div>

        <div className="border-t border-b border-gray-200 py-4">
          <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-md cursor-pointer border border-gray-200 transition-all bg-white">
            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
              <Plus className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">Blank Column</h4>
              <p className="text-xs text-gray-500">Enter data manually in new column</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-medium text-gray-500 mb-3 tracking-wider">
            MOST POPULAR
          </h3>
          <div className="space-y-2">
            {popularItems.map((item) => (
              <div
                key={item.title}
                onClick={() => item.clickable && handleSelectAI()}
                className={`flex items-center gap-3 p-3 border border-gray-200 rounded-md transition-all ${
                  item.clickable
                    ? "hover:border-sheet-green hover:bg-green-50 hover:shadow cursor-pointer"
                    : "cursor-default opacity-60"
                }`}
              >
                <div className={`w-8 h-8 ${item.bgColor} rounded flex items-center justify-center`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
                {item.clickable && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-medium text-gray-500 mb-3 tracking-wider">INTEGRATIONS</h3>
          <div className="space-y-2">
            {integrationItems.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-md cursor-default opacity-60"
              >
                <div className={`w-8 h-8 ${item.bgColor} rounded flex items-center justify-center`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

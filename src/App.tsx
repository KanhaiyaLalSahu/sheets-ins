import { useState } from "react";
import Header from "./components/Header";
import { Spreadsheet } from "./components/SpreadSheet";
import Sidebar from "./components/SpreadSheet/Sidebar";
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <Spreadsheet />
      </div>
    </div>
  );
}

export default App;

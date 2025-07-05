import Header from "./components/Header"
import { Spreadsheet } from "./components/SpreadSheet"


function App() {

  return (
      <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <Spreadsheet/>  
    </div>
  )
}

export default App

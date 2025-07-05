import Import from "../../assets/Arrow.svg";
import Export from "../../assets/Arrow Upload.svg";
import Split from "../../assets/Arrow Split.svg";
import Share from "../../assets/Share.svg";

export function ActionToolbar() {

  return (
    <div className="flex items-center space-x-2">
        <button className="flex items-center space-x-1 px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-100">
          <img src={Import} alt="" />
          <span>Import</span>
        </button>
        <button className="flex items-center space-x-1 px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-100">
          <img src={Export} alt="" />
          <span>Export</span>
        </button>
        <button className="flex items-center space-x-1 px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-100">
          <img src={Share} alt="" />
          <span>Share</span>
        </button>
        <button className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-[#4B6A4F] text-white rounded hover:bg-green-700">
          <img src={Split} alt="" />
          <span>New Action</span>
        </button>
    </div>
  )
}

export default ActionToolbar

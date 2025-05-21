
import { CalendarX, Plus } from "lucide-react"

const SlotNotFoundCard = ({date}) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-center mb-5">
          <div className="relative">
            <div className="absolute inset-0 bg-red-100 rounded-full transform scale-150 opacity-50"></div>
            <div className="relative bg-white p-3 rounded-full border border-red-200 shadow-sm">
              <CalendarX className="h-10 w-10 text-red-500" />
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">No Schedules Available</h3>

        <p className="text-gray-600 text-center mb-6">There are no schedules found for {date}.</p>

        <div className="flex justify-center">
          <button
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Schedule
          </button>
        </div>
      </div>
    </div>
  )
}


export default SlotNotFoundCard;
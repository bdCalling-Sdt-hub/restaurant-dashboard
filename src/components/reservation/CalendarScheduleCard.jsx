import { Clock, Edit, Trash2, Users } from "lucide-react";

const CalendarScheduleCard = ( {schedule}) => {


    return (
        <>
            <div
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="p-5">
              <div className="flex items-center mb-3">
                <Clock className="h-5 w-5 mr-2 text-blue-500" />
                <span className="text-gray-800 font-medium">
                  {schedule?.time}
                </span>
              </div>

              <div className="flex items-center mb-4">
                <Users className="h-5 w-5 mr-2 text-gray-500" />
                <span className="text-gray-700">Seats: {schedule?.seats}</span>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-500 transition-colors"
                  aria-label="Edit schedule"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-500 transition-colors"
                  aria-label="Delete schedule"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </>
    );
};

export default CalendarScheduleCard;
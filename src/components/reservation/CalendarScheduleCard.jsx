import { Clock, Users, HandPlatter } from "lucide-react";
import DeleteResrvationModal from "../modal/reservation/DeleteResrvationModal";
import EditReservationModal from "../modal/reservation/EditReservationModal";
import { IoEyeSharp } from "react-icons/io5";
import ViewReservationModal from "../modal/reservation/ViewReservationModal";

const CalendarScheduleCard = ({ schedule }) => {
  return (
    <>
      <div
        className={`rounded-lg shadow-sm border border-gray-200 overflow-hidden ${
          schedule?.seats === 0 ? "bg-red-100 border-red-300" : "bg-white"
        }`}
      >
        <div className="p-5">
          <div className="flex justify-between">
            <div>
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
              <div className="flex items-center mb-4">
                <HandPlatter className="h-5 w-5 mr-2 text-gray-500" />
                <span className="text-gray-700">
                  Dining: {schedule?.count}
                </span>
              </div>
            </div>
            <div>
               <ViewReservationModal schedule={schedule}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendarScheduleCard;

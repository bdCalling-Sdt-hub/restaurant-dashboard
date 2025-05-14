import { Clock, Users } from "lucide-react";
import DeleteResrvationModal from "../modal/reservation/DeleteResrvationModal";
import EditReservationModal from "../modal/reservation/EditReservationModal";

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
               <EditReservationModal reservation={schedule}/>
               <DeleteResrvationModal reservationId={schedule?._id}/>
              </div>
            </div>
          </div>
        </>
    );
};

export default CalendarScheduleCard;
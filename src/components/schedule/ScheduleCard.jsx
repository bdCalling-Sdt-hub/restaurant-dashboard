import { Clock} from "lucide-react";
import DeleteScheduleModal from "../modal/schedule/DeleteScheduleModal";

const ScheduleCard = ({ schedule }) => {
  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5">
          <div className="flex items-center mb-3">
            <Clock className="h-5 w-5 mr-2 text-blue-500" />
            <span className="text-gray-800 font-medium">{schedule?.time}</span>
          </div>
          <div className="flex justify-end space-x-2">
            <DeleteScheduleModal scheduleId={schedule?._id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleCard;

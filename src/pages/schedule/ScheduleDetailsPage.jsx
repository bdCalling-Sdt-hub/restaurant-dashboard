import { ArrowLeft, Calendar} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import ScheduleDetails from "../../components/schedule/ScheduleDetails";
import AddScheduleModal from "../../components/modal/schedule/AddScheduleModal";

const ScheduleDetailsPage = () => {
  const { date } = useParams();
  const navigate = useNavigate();

  // Function to go back one day
  const handleGoBack = () => {
    navigate("/schedules");
  };

  return (
    <div className="container mx-auto px-4 py-2 bg-gray-50 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button
            onClick={handleGoBack}
            className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Go to previous day"
          >
            <ArrowLeft className="h-5 w-5 text-xl" />
          </button>
          <div className="bg-blue-100 text-blue-700 border border-blue-300 px-4 py-2 rounded-md flex items-center shadow-sm">
            <Calendar className="h-5 w-5 mr-2" />
            <span className="font-medium">Date: {date}</span>
          </div>
        </div>

        <h1 className="font-semibold text-2xl">Available Time Slots</h1>

        <AddScheduleModal />
      </div>

      <ScheduleDetails />
    </div>
  );
};

export default ScheduleDetailsPage;

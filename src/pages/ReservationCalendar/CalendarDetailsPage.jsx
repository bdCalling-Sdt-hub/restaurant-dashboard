
import { ArrowLeft, Calendar, Plus, Edit } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import CalendarDetails from "../../components/reservation/CalendarDetails";

const CalendarDetailsPage = () => {
  const { date } = useParams();
  const navigate = useNavigate();


  // Function to go back one day
  const handleGoBack = () => {
    navigate("/reservation-calendar");
  }



  const handleAddNew = () => {
    // Implement add new functionality
    console.log("Adding new schedule")
  }

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
          <div className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center shadow-sm">
            <Calendar className="h-5 w-5 mr-2" />
            <span className="font-medium">Date: {date}</span>
          </div>
        </div>


        <button
          onClick={handleAddNew}
          className="bg-rose-600 text-white px-4 py-2 rounded-md flex items-center shadow-sm hover:bg-rose-700 transition-colors"
          aria-label="Add new schedule"
        >
          <Plus className="h-5 w-5 mr-2" />
          <span> Add New</span>
        </button>
      </div>

      <CalendarDetails/>
    </div>
  )
}

export default CalendarDetailsPage

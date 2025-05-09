import { ClockIcon, HandPlatter } from "lucide-react";

const SelectionWarningCard = () => {
  return (
    <>
      <div className="w-full h-full rounded-lg shadow-md flex flex-col justify-center items-center bg-gradient-to-b from-sky-50 to-blue-50">
        <div className="flex flex-col items-center justify-center h-full w-full p-8">
          <div className="text-center space-y-4 max-w-md">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <ClockIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-blue-700">
              Please Complete Selection
            </h2>
            <p className="text-blue-600">
              To view available tables, please select a schedule, and dining
              option from the left panel.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mt-6">
              {/* <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-full shadow-sm">
                         <CalendarIcon className="h-4 w-4 text-blue-500" />
                         <span className="text-sm">Select date</span>
                       </div> */}
              <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-full shadow-sm">
                <ClockIcon className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Select Schedule</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-full shadow-sm">
                <HandPlatter className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Select Dining</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectionWarningCard;

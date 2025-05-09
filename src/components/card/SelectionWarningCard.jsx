import { CalendarIcon, ClockIcon, UsersIcon, UtensilsCrossedIcon } from 'lucide-react';
import { useState } from 'react';

const SelectionWarningCard = () => {
      const [date, setDate] = useState("2025-05-08")
      const [checkIn, setCheckIn] = useState("8:00 AM")
      const [checkOut, setCheckOut] = useState("9:00 AM")
      const [guests, setGuests] = useState("1")
      const [schedule, setSchedule] = useState("")
      const [dining, setDining] = useState("")
      const [isComplete, setIsComplete] = useState(false)
 
 
    return (
        <>


        <div
               className={`w-full h-full rounded-lg shadow-md flex flex-col justify-center items-center ${
                 isComplete ? "bg-gradient-to-b from-emerald-50 to-teal-50" : "bg-gradient-to-b from-sky-50 to-blue-50"
               }`}
             >
               <div className="flex flex-col items-center justify-center h-full w-full p-8">
                 {isComplete ? (
                   <div className="text-center space-y-4">
                     <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                       <UtensilsCrossedIcon className="h-8 w-8 text-emerald-600" />
                     </div>
                     <h2 className="text-2xl font-bold text-emerald-700">Reservation Complete!</h2>
                     <p className="text-emerald-600">
                       Your table has been reserved for {date} at {checkIn}.
                     </p>
                     <div className="flex flex-col md:flex-row gap-3 justify-center mt-4">
                       <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                         View Reservation
                       </button>
                       <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                         Modify Details
                       </button>
                     </div>
                   </div>
                 ) : (
                   <div className="text-center space-y-4 max-w-md">
                     <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                       <ClockIcon className="h-8 w-8 text-blue-600" />
                     </div>
                     <h2 className="text-2xl font-bold text-blue-700">Please Complete Selection</h2>
                     <p className="text-blue-600">
                       To view available tables, please select a date, schedule, and dining option from the left panel.
                     </p>
                     <div className="flex flex-wrap gap-3 justify-center mt-6">
                       <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-full shadow-sm">
                         <CalendarIcon className="h-4 w-4 text-blue-500" />
                         <span className="text-sm">Select date</span>
                       </div>
                       <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-full shadow-sm">
                         <ClockIcon className="h-4 w-4 text-blue-500" />
                         <span className="text-sm">Choose time</span>
                       </div>
                       <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-full shadow-sm">
                         <UsersIcon className="h-4 w-4 text-blue-500" />
                         <span className="text-sm">Add guests</span>
                       </div>
                     </div>
                     <button
                       className={`mt-6 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                         !date || !checkIn || !checkOut || !guests || !schedule || !dining
                           ? "bg-blue-400 cursor-not-allowed"
                           : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                       }`}
                     >
                       Find Available Tables
                     </button>
                   </div>
                 )}
               </div>
             </div>





             {/* <div className="flex h-[580px]">
            <div className="w-full p-6 bg-blue-50 border border-blue-200 rounded-2xl shadow-sm text-center">
              <h2 className="text-xl font-semibold text-blue-800 mb-2">
                Please Complete Selection
              </h2>
              <p className="text-sm text-blue-700">
                To view available tables, please select a{" "}
                <span className="font-medium">date</span>,{" "}
                <span className="font-medium">schedule</span>, and{" "}
                <span className="font-medium">dining option</span> from the left
                panel.
              </p>
            </div>
          </div> */}
        </>
    );
};

export default SelectionWarningCard;
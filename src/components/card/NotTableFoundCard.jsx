
import { useState } from "react"
import { CalendarIcon, Clock, Users, ChevronDown, AlertCircle } from "lucide-react"

const NotTableFoundCard = () =>{
  const [date, setDate] = useState("2025-05-08")
  const [checkIn, setCheckIn] = useState("8:00 AM")
  const [checkOut, setCheckOut] = useState("9:00 AM")
  const [guests, setGuests] = useState(1)
  const [schedule, setSchedule] = useState("12:00 PM-1:00 PM")
  const [dining, setDining] = useState("RoofTop")
  const [showScheduleDropdown, setShowScheduleDropdown] = useState(false)
  const [showDiningDropdown, setShowDiningDropdown] = useState(false)
  const [hasError, setHasError] = useState(true)

  const scheduleOptions = [
    "11:00 AM-12:00 PM",
    "12:00 PM-1:00 PM",
    "1:00 PM-2:00 PM",
    "2:00 PM-3:00 PM",
    "6:00 PM-7:00 PM",
    "7:00 PM-8:00 PM",
    "8:00 PM-9:00 PM",
  ]

  const diningOptions = ["RoofTop", "Main Hall", "Garden", "Private Room"]

  const handleGuestChange = (change) => {
    const newValue = guests + change
    if (newValue >= 1 && newValue <= 10) {
      setGuests(newValue)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex flex-col lg:flex-row lg:items-stretch lg:justify-center gap-6">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md mx-auto lg:mx-0">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Make a Reservation</h2>

        <div className="space-y-5">
          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <div className="relative">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              <CalendarIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Check In/Out Times */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check In</label>
              <div className="relative">
                <select
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full appearance-none px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  <option>7:00 AM</option>
                  <option>7:30 AM</option>
                  <option>8:00 AM</option>
                  <option>8:30 AM</option>
                  <option>9:00 AM</option>
                </select>
                <Clock className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check Out</label>
              <div className="relative">
                <select
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full appearance-none px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  <option>8:30 AM</option>
                  <option>9:00 AM</option>
                  <option>9:30 AM</option>
                  <option>10:00 AM</option>
                  <option>10:30 AM</option>
                </select>
                <Clock className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Guests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
            <div className="flex items-center">
              <button
                onClick={() => handleGuestChange(-1)}
                className="h-10 w-10 rounded-l-lg bg-gray-100 flex items-center justify-center border border-gray-300 hover:bg-gray-200 transition-colors"
              >
                <span className="text-xl font-medium">-</span>
              </button>
              <div className="h-10 px-4 flex items-center justify-center border-t border-b border-gray-300 bg-white">
                <span className="text-gray-800 font-medium">{guests}</span>
              </div>
              <button
                onClick={() => handleGuestChange(1)}
                className="h-10 w-10 rounded-r-lg bg-gray-100 flex items-center justify-center border border-gray-300 hover:bg-gray-200 transition-colors"
              >
                <span className="text-xl font-medium">+</span>
              </button>
              <Users className="ml-3 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Schedule */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <span className="text-red-500">*</span> Schedule
            </label>
            <div className="relative">
              <button
                onClick={() => setShowScheduleDropdown(!showScheduleDropdown)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-left flex items-center justify-between focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                <span>{schedule}</span>
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </button>

              {showScheduleDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                  {scheduleOptions.map((option) => (
                    <div
                      key={option}
                      className={`px-4 py-2 cursor-pointer hover:bg-purple-50 ${
                        schedule === option ? "bg-purple-100 text-purple-700" : ""
                      }`}
                      onClick={() => {
                        setSchedule(option)
                        setShowScheduleDropdown(false)
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Dining */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <span className="text-red-500">*</span> Dining
            </label>
            <div className="relative">
              <button
                onClick={() => setShowDiningDropdown(!showDiningDropdown)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-left flex items-center justify-between focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                <span>{dining}</span>
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </button>

              {showDiningDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                  {diningOptions.map((option) => (
                    <div
                      key={option}
                      className={`px-4 py-2 cursor-pointer hover:bg-purple-50 ${
                        dining === option ? "bg-purple-100 text-purple-700" : ""
                      }`}
                      onClick={() => {
                        setDining(option)
                        setShowDiningDropdown(false)
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Selected Summary */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Selected Summary</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="text-gray-600 w-24">Schedule:</span>
              <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                {schedule}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 w-24">Dining:</span>
              <span className="px-2.5 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                {dining}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message - Full Height */}
      {hasError && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-md mx-auto lg:mx-0 lg:flex lg:flex-col lg:h-full">
          <div className="bg-red-50 p-6 lg:flex-1 lg:flex lg:flex-col lg:justify-center">
            <div className="flex flex-col items-center text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-xl font-bold text-red-700 mb-2">No Tables Available</h3>
              <p className="text-red-600 mb-4">
                Sorry, we couldn't find any available tables for the selected schedule and dining option.
              </p>
              <p className="text-red-600">Please try selecting a different combination or check back later.</p>
            </div>
          </div>

          <div className="p-6 lg:mt-auto">
            <button
              onClick={() => setHasError(false)}
              className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
            >
              Try Different Options
            </button>

            <button className="w-full mt-3 py-2.5 border border-purple-600 text-purple-600 hover:bg-purple-50 font-medium rounded-lg transition-colors">
              Join Waitlist
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default NotTableFoundCard;

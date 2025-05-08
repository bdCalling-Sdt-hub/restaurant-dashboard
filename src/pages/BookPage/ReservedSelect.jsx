
import { useState, useEffect } from "react"
import { CalendarIcon, ClockIcon, UsersIcon, UtensilsCrossedIcon, ChevronDownIcon, CheckIcon } from "lucide-react"

export default function ReservedSelect() {
  const [date, setDate] = useState("2025-05-08")
  const [checkIn, setCheckIn] = useState("8:00 AM")
  const [checkOut, setCheckOut] = useState("9:00 AM")
  const [guests, setGuests] = useState("1")
  const [schedule, setSchedule] = useState("")
  const [dining, setDining] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showCheckInDropdown, setShowCheckInDropdown] = useState(false)
  const [showCheckOutDropdown, setShowCheckOutDropdown] = useState(false)
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false)
  const [showScheduleDropdown, setShowScheduleDropdown] = useState(false)
  const [showDiningDropdown, setShowDiningDropdown] = useState(false)

  const checkInOptions = ["7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM"]
  const checkOutOptions = ["8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM"]
  const guestOptions = ["1", "2", "3", "4", "5", "6"]
  const scheduleOptions = ["8:00 AM-9:00 AM", "9:00 AM-10:00 AM", "10:00 AM-11:00 AM", "11:00 AM-12:00 PM"]
  const diningOptions = ["Breakfast", "Brunch", "Lunch", "Dinner"]

  const handleSubmit = () => {
    if (date && checkIn && checkOut && guests && schedule && dining) {
      setIsComplete(true)
    }
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowDatePicker(false)
      setShowCheckInDropdown(false)
      setShowCheckOutDropdown(false)
      setShowGuestsDropdown(false)
      setShowScheduleDropdown(false)
      setShowDiningDropdown(false)
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Custom dropdown component
  const Dropdown = ({ value, options, onChange, isOpen, setIsOpen, placeholder }) => {
    return (
      <div className="relative">
        <button
          type="button"
          className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen(!isOpen)
          }}
        >
          <span className={value ? "text-gray-900" : "text-gray-500"}>{value || placeholder}</span>
          <ChevronDownIcon className="h-4 w-4 text-gray-500" />
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto max-h-60">
            {options.map((option) => (
              <div
                key={option}
                className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50 ${
                  value === option ? "bg-blue-50" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation()
                  onChange(option)
                  setIsOpen(false)
                }}
              >
                <span className={`block truncate ${value === option ? "font-medium" : "font-normal"}`}>{option}</span>
                {value === option && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <CheckIcon className="h-4 w-4 text-blue-600" />
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl mx-auto p-4 md:p-6">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Reservation Details</h2>
          <p className="text-sm text-gray-500">Fill in your reservation information</p>
        </div>

        <div className="p-5 space-y-4">
          {/* Date Picker */}
          <div className="space-y-2">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Check In Time */}
          <div className="space-y-2">
            <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">
              Check In
            </label>
            <Dropdown
              value={checkIn}
              options={checkInOptions}
              onChange={setCheckIn}
              isOpen={showCheckInDropdown}
              setIsOpen={setShowCheckInDropdown}
              placeholder="Select time"
            />
          </div>

          {/* Check Out Time */}
          <div className="space-y-2">
            <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">
              Check Out
            </label>
            <Dropdown
              value={checkOut}
              options={checkOutOptions}
              onChange={setCheckOut}
              isOpen={showCheckOutDropdown}
              setIsOpen={setShowCheckOutDropdown}
              placeholder="Select time"
            />
          </div>

          {/* Guests */}
          <div className="space-y-2">
            <label htmlFor="guests" className="block text-sm font-medium text-gray-700">
              Guests
            </label>
            <Dropdown
              value={guests}
              options={guestOptions}
              onChange={setGuests}
              isOpen={showGuestsDropdown}
              setIsOpen={setShowGuestsDropdown}
              placeholder="Select guests"
            />
          </div>

          {/* Schedule */}
          <div className="space-y-2">
            <label htmlFor="schedule" className="block text-sm font-medium text-gray-700">
              <span className="text-rose-500">*</span> Schedule
            </label>
            <Dropdown
              value={schedule}
              options={scheduleOptions}
              onChange={setSchedule}
              isOpen={showScheduleDropdown}
              setIsOpen={setShowScheduleDropdown}
              placeholder="Select a schedule"
            />
          </div>

          {/* Dining */}
          <div className="space-y-2">
            <label htmlFor="dining" className="block text-sm font-medium text-gray-700">
              <span className="text-rose-500">*</span> Dining
            </label>
            <Dropdown
              value={dining}
              options={diningOptions}
              onChange={setDining}
              isOpen={showDiningDropdown}
              setIsOpen={setShowDiningDropdown}
              placeholder="Select a dining"
            />
          </div>
        </div>
      </div>

      {/* Right Panel - Status */}
      <div
        className={`w-full lg:w-2/3 rounded-lg shadow-md flex flex-col justify-center items-center ${
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
                onClick={handleSubmit}
                disabled={!date || !checkIn || !checkOut || !guests || !schedule || !dining}
              >
                Find Available Tables
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Calendar, Clock, Users, MapPin, Check } from "lucide-react"
//import "./App.css"

const ReservedPage =  () => {
  const [date, setDate] = useState("2025-05-08")
  const [checkIn, setCheckIn] = useState("08:00")
  const [checkOut, setCheckOut] = useState("09:00")
  const [guests, setGuests] = useState(1)
  const [dining, setDining] = useState("Out Door")
  const [selectedTable, setSelectedTable] = useState()

  // Sample table data
  const tables = [
    { id: "T-1", seats: 10, available: true },
    { id: "T-2", seats: 10, available: true },
    { id: "T-3", seats: 10, available: true },
    { id: "T-4", seats: 10, available: true },
    { id: "T-5", seats: 10, available: false },
    { id: "T-6", seats: 10, available: true },
    { id: "T-7", seats: 10, available: true },
    { id: "T-8", seats: 10, available: false },
    { id: "T-9", seats: 10, available: true },
    { id: "T-10", seats: 4, available: true },
    { id: "T-11", seats: 4, available: true },
    { id: "T-12", seats: 6, available: true },
  ]

  const handleTableSelect = (tableId) => {
    setSelectedTable(tableId)
  }

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours)
    return `${hour > 12 ? hour - 12 : hour}:${minutes} ${hour >= 12 ? "PM" : "AM"}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Table Reservation</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Reservation Form */}
          <div className="w-full lg:w-1/3 bg-white rounded-xl shadow-sm p-6 h-fit">
            <h2 className="text-xl font-semibold text-gray-700 mb-6">Reservation Details</h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="pl-10 block w-full rounded-md border border-gray-300 py-2 text-gray-900 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check In</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="time"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="pl-10 block w-full rounded-md border border-gray-300 py-2 text-gray-900 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check Out</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="time"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="pl-10 block w-full rounded-md border border-gray-300 py-2 text-gray-900 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={guests}
                    onChange={(e) => setGuests(Number.parseInt(e.target.value))}
                    className="pl-10 block w-full rounded-md border border-gray-300 py-2 text-gray-900 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dining Area</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    value={dining}
                    onChange={(e) => setDining(e.target.value)}
                    className="pl-10 block w-full rounded-md border border-gray-300 py-2 text-gray-900 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  >
                    <option>Out Door</option>
                    <option>In Door</option>
                    <option>Rooftop</option>
                    <option>Private Room</option>
                  </select>
                </div>
              </div>
            </div>

            {selectedTable && (
              <div className="mt-6 p-4 bg-rose-50 rounded-lg border border-rose-100">
                <h3 className="font-medium text-rose-800 flex items-center gap-1">
                  <Check className="h-4 w-4" /> Reservation Summary
                </h3>
                <div className="mt-2 text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p>
                    <span className="font-medium">Time:</span> {formatTime(checkIn)} - {formatTime(checkOut)}
                  </p>
                  <p>
                    <span className="font-medium">Guests:</span> {guests}
                  </p>
                  <p>
                    <span className="font-medium">Location:</span> {dining}
                  </p>
                  <p>
                    <span className="font-medium">Table:</span> {selectedTable}
                  </p>
                </div>
              </div>
            )}

            <button
              className={`mt-6 w-full py-3 px-4 rounded-md font-medium text-white ${selectedTable ? "bg-rose-600 hover:bg-rose-700" : "bg-gray-400 cursor-not-allowed"}`}
              disabled={!selectedTable}
            >
              Confirm Reservation
            </button>
          </div>

          {/* Table Selection */}
          <div className="w-full lg:w-2/3 bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-700">Select a Table</h2>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                  <span>Unavailable</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <span>Selected</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {tables.map((table) => (
                <div
                  key={table.id}
                  onClick={() => table.available && handleTableSelect(table.id)}
                  className={`
                    relative flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all transform hover:scale-105
                    ${table.available ? "cursor-pointer" : "cursor-not-allowed opacity-60"}
                    ${selectedTable === table.id ? "border-rose-500 bg-rose-50" : table.available ? "border-green-500 bg-green-50" : "border-gray-300 bg-gray-100"}
                  `}
                >
                  <div
                    className={`
                    w-16 h-16 flex items-center justify-center transform rotate-45 mb-2
                    ${selectedTable === table.id ? "bg-rose-500" : table.available ? "bg-green-500" : "bg-gray-400"}
                  `}
                  >
                    <span className="transform -rotate-45 text-white font-bold">{table.id}</span>
                  </div>
                  <span className="font-medium text-gray-800">{table.seats} Seats</span>
                  <span className="text-xs text-gray-500">
                    {selectedTable === table.id ? "Selected" : table.available ? "Available" : "Unavailable"}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="font-medium text-blue-800">Need Help?</h3>
              <p className="mt-1 text-sm text-gray-600">
                For special requests or assistance with your reservation, please contact us at (555) 123-4567.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReservedPage;

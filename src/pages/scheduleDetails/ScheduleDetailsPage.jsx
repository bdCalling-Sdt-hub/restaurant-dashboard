"use client"

import { useState } from "react"
import { Clock, Users, Edit, Trash2, ArrowLeft, Calendar } from "lucide-react"

export default function ScheduleList() {
  const [currentDate, setCurrentDate] = useState(new Date("2025-05-10"))

  // Format date as YYYY-MM-DD
  const formattedDate = currentDate.toISOString().split("T")[0]

  // Function to go back one day
  const goToPreviousDay = () => {
    const prevDay = new Date(currentDate)
    prevDay.setDate(prevDay.getDate() - 1)
    setCurrentDate(prevDay)
  }

  const [schedules, setSchedules] = useState([
    { id: 1, startTime: "10:00 AM", endTime: "11:00 AM", seats: 10 },
    { id: 2, startTime: "12:00 PM", endTime: "01:00 PM", seats: 15 },
    { id: 3, startTime: "02:00 PM", endTime: "03:00 PM", seats: 8 },
    { id: 4, startTime: "04:00 PM", endTime: "05:00 PM", seats: 12 },
    { id: 5, startTime: "06:00 PM", endTime: "07:00 PM", seats: 5 },
  ])

  const handleEdit = (id) => {
    // Implement edit functionality
    console.log(`Editing schedule with id: ${id}`)
  }

  const handleDelete = (id) => {
    // Implement delete functionality
    setSchedules(schedules.filter((schedule) => schedule.id !== id))
    console.log(`Deleted schedule with id: ${id}`)
  }

  return (
    <div className="container mx-auto px-4 py-2 bg-gray-50 h-full">
        <div className="flex items-center justify-between">
             <div className="flex items-center">
        <button
          onClick={goToPreviousDay}
          className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Go to previous day"
        >
          <ArrowLeft className="h-5 w-5 text-xl" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Schedule List</h1>
      </div>

      <div className="bg-blue-600 text-white px-4 py-3 rounded-md mb-6 flex items-center shadow-sm">
        <Calendar className="h-5 w-5 mr-2" />
        <span className="font-medium">Date: {formattedDate}</span>
      </div>
        </div>
     

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {schedules.map((schedule) => (
          <div key={schedule.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5">
              <div className="flex items-center mb-3">
                <Clock className="h-5 w-5 mr-2 text-blue-500" />
                <span className="text-gray-800 font-medium">
                  {schedule.startTime} - {schedule.endTime}
                </span>
              </div>

              <div className="flex items-center mb-4">
                <Users className="h-5 w-5 mr-2 text-gray-500" />
                <span className="text-gray-700">Seats: {schedule.seats}</span>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleEdit(schedule.id)}
                  className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-500 transition-colors"
                  aria-label="Edit schedule"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(schedule.id)}
                  className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-500 transition-colors"
                  aria-label="Delete schedule"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

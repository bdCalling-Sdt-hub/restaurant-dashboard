"use client"

import { Clock, User, Pencil, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"
import TimeSlotSkeleton from "./time-slot-skeleton"

// Sample data structure
interface TimeSlot {
  id: number
  startTime: string
  endTime: string
  seats: number
}

export default function TimeSlotGrid() {
  const [loading, setLoading] = useState(true)
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])

  // Simulate loading data
  useEffect(() => {
    // This simulates fetching data from an API
    const fetchData = async () => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Sample data matching the design
      const data: TimeSlot[] = [
        { id: 1, startTime: "10:00 AM", endTime: "11:00 AM", seats: 10 },
        { id: 2, startTime: "12:00 PM", endTime: "01:00 PM", seats: 15 },
        { id: 3, startTime: "02:00 PM", endTime: "03:00 PM", seats: 8 },
        { id: 4, startTime: "04:00 PM", endTime: "05:00 PM", seats: 12 },
        { id: 5, startTime: "06:00 PM", endTime: "07:00 PM", seats: 5 },
        { id: 6, startTime: "10:00 AM", endTime: "11:00 AM", seats: 10 },
        { id: 7, startTime: "12:00 PM", endTime: "01:00 PM", seats: 15 },
        { id: 8, startTime: "02:00 PM", endTime: "03:00 PM", seats: 8 },
        { id: 9, startTime: "04:00 PM", endTime: "05:00 PM", seats: 12 },
        { id: 10, startTime: "06:00 PM", endTime: "07:00 PM", seats: 5 },
        { id: 11, startTime: "04:00 PM", endTime: "05:00 PM", seats: 12 },
        { id: 12, startTime: "06:00 PM", endTime: "07:00 PM", seats: 5 },
      ]

      setTimeSlots(data)
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return <TimeSlotSkeleton />
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {timeSlots.map((slot) => (
        <div
          key={slot.id}
          className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center mb-4">
            <Clock className="w-5 h-5 text-blue-500 mr-2" />
            <span className="text-gray-700">
              {slot.startTime} - {slot.endTime}
            </span>
          </div>

          <div className="flex items-center mb-6">
            <User className="w-5 h-5 text-blue-500 mr-2" />
            <span className="text-gray-700">Seats: {slot.seats}</span>
          </div>

          <div className="flex justify-end space-x-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-500 hover:bg-blue-200 transition-colors">
              <Pencil className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

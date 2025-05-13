"use client"

import { useEffect, useState } from "react"

export default function TimeSlotSkeleton() {
  const [itemCount, setItemCount] = useState(9)

  // Adjust number of skeleton items based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemCount(3) // Show fewer on mobile
      } else if (window.innerWidth < 1024) {
        setItemCount(6) // Show medium amount on tablet
      } else {
        setItemCount(9) // Show full amount on desktop
      }
    }

    handleResize() // Set initial count
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {Array.from({ length: itemCount }).map((_, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm animate-pulse">
          {/* Time slot skeleton */}
          <div className="flex items-center mb-4">
            <div className="w-5 h-5 rounded-full bg-gray-200 mr-2"></div>
            <div className="h-4 bg-gray-200 rounded w-40"></div>
          </div>

          {/* Seats skeleton */}
          <div className="flex items-center mb-6">
            <div className="w-5 h-5 rounded-full bg-gray-200 mr-2"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>

          {/* Action buttons skeleton */}
          <div className="flex justify-end space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-100"></div>
            <div className="w-8 h-8 rounded-full bg-red-100"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

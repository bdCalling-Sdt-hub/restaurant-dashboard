
import { AlertCircle } from "lucide-react"

const NotTableFoundCard = () =>{


  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden w-full mx-auto lg:mx-0 lg:flex lg:flex-col lg:h-full">
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
        </div>
    </>
  )
}

export default NotTableFoundCard;

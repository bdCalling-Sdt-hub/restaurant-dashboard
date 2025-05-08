import restaurant_img from "../../assets/images/restaurant.png";
import { MapPin, Star, Tag, Check, DollarSign, X, Pencil, SquarePen } from "lucide-react"
import UpdateNameModal from "../modal/restaurant/UpdateNameModal";
import UpdateImageModal from "../modal/restaurant/UpdateImageModal";
import UpdateAddressModal from "../modal/restaurant/UpdateAddressModal";
import UpdateLocationModal from "../modal/restaurant/UpdateLocationModal";
import UpdateInformationModal from "../modal/restaurant/UpdateInformationModal";
import UpdateDiscountModal from "../modal/restaurant/UpdateDiscountModal";
import UpdateFeaturesModal from "../modal/restaurant/UpdateFeaturesModal";
import UpdateKeywordsModal from "../modal/restaurant/UpdateKeywordsModal";
// Remove the direct import of the image file

const MyRestaurant = ({ data:Restaurant }) => {


  // Sample restaurant data
  const restaurant = {
    name: "Bella Italia",
    image: restaurant_img, // Using a placeholder image instead
    address: "123 Culinary Street, Foodville, FC 12345",
    longitude: 40.7128,
    latitude: -74.006,
    discount: "20% off on weekdays",
    ratings: 4.7,
    paymentRequired: true,
    cancellationPercentage: 15,
    bookingFeePerGuest: 5,
    keywords: ["Italian", "Pasta", "Pizza", "Wine", "Romantic"],
    features: ["Outdoor Seating", "Vegetarian Options", "Wheelchair Accessible", "Free WiFi", "Takeaway Available"],
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white">
      {/* Restaurant Name */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl md:text-4xl font-bold">{Restaurant.name}</h1>
        <UpdateNameModal/>
      </div>

      {/* Restaurant Image */}
      <div className="mb-6 rounded-lg overflow-hidden shadow-md relative group">
        <img
          src={Restaurant.restaurantImg || restaurant_img}
          alt="restaurant_img"
          onError={(e) => {
            e.currentTarget.onerror = null; // Prevent infinite loop
            e.currentTarget.src = restaurant_img // placeholder_img;
          }}
          className="w-full h-auto object-cover"
        />
       <UpdateImageModal/>
      </div>

      {/* Main Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Address */}
          <div className="flex items-start justify-between group">
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-gray-600 mt-1 mr-2 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800">Address</h3>
                <p className="text-gray-600">{Restaurant.address}</p>
              </div>
            </div>
           <UpdateAddressModal/>
          </div>

          {/* Coordinates */}
          <div className="bg-gray-50 p-3 rounded-md relative group">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-gray-800 mb-1">Location</h3>
             <UpdateLocationModal/>
            </div>
            <p className="text-sm text-gray-600">
              Longitude: {restaurant.longitude} | Latitude: {restaurant.latitude}
            </p>
          </div>

          {/* Discount */}
          <div className="bg-green-50 p-3 rounded-md border-l-4 border-green-500 relative group">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-green-700">Discount/Offer</h3>
             <UpdateDiscountModal/>
            </div>
            <p className="text-green-600">{restaurant.discount}</p>
          </div>

          {/* Keywords */}
          <div className="relative group">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-800">Keywords</h3>
              <UpdateKeywordsModal/>
            </div>
            <div className="flex flex-wrap gap-2">
              {restaurant.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Ratings */}
          <div className="bg-amber-50 p-4 rounded-md relative group">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <h3 className="font-semibold text-gray-800 mr-2">Rating</h3>
                <div className="flex items-center">
                  <span className="text-xl font-bold text-amber-500 mr-1">{restaurant.ratings}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(restaurant.ratings) ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-gray-50 p-4 rounded-md space-y-3 relative">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-gray-800">Booking Information</h3>
              <UpdateInformationModal/>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Payment Required</span>
              <span className="flex items-center">
                {restaurant.paymentRequired ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <X className="w-5 h-5 text-red-500" />
                )}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Cancellation Fee</span>
              <span className="font-medium">{restaurant.cancellationPercentage}%</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Booking Fee</span>
              <span className="flex items-center font-medium">
                <DollarSign className="w-4 h-4" />
                {restaurant.bookingFeePerGuest} per guest
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="border-t pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800 text-lg">Features</h3>
          {/* here */}
          <UpdateFeaturesModal/>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {restaurant.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="w-5 h-5 text-green-500 mr-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default MyRestaurant

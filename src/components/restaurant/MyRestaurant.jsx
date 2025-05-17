import restaurant_img from "../../assets/images/restaurant.png";
import { MapPin, Star, Tag, Check, DollarSign, X, SquarePen } from "lucide-react";
import UpdateNameModal from "../modal/restaurant/UpdateNameModal";
import UpdateImageModal from "../modal/restaurant/UpdateImageModal";
import UpdateAddressModal from "../modal/restaurant/UpdateAddressModal";
import UpdateInformationModal from "../modal/restaurant/UpdateInformationModal";
import UpdateDiscountModal from "../modal/restaurant/UpdateDiscountModal";
import UpdateFeaturesModal from "../modal/restaurant/UpdateFeaturesModal";
import UpdateKeywordsModal from "../modal/restaurant/UpdateKeywordsModal";
import { useNavigate } from "react-router-dom";
import UpdateLocationModal from "../modal/restaurant/UpdateLocationModal";

const MyRestaurant = ({ data: restaurant }) => {
  const navigate = useNavigate()

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 bg-white">
      {/* Restaurant Name */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl md:text-4xl font-bold">{restaurant.name}</h1>
        <UpdateNameModal restaurant={restaurant} />
      </div>

      {/* Restaurant Image */}
      <div className="mb-6 rounded-lg overflow-hidden shadow-md relative group">
        <img
          src={restaurant.restaurantImg || restaurant_img}
          alt="restaurant_img"
          onError={(e) => {
            e.currentTarget.onerror = null; // Prevent infinite loop
            e.currentTarget.src = restaurant_img; // placeholder_img;
          }}
          className="w-full h-[300px] object-cover"
        />
        <UpdateImageModal restaurant={restaurant} />
      </div>

      {/* Main Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Address */}
          <div className="bg-gray-50 rounded-md">
            <div className="flex items-start justify-between group p-3">
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-gray-600 mt-1 mr-2 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800">Address</h3>
                <p className="text-gray-600">{restaurant.address}</p>
              </div>
            </div>
             <button
                onClick={() => navigate(`/restaurant/update-location`)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Edit restaurant name"
              >
                <SquarePen className="w-5 h-5" />
              </button>
          </div>

          {/* Coordinates */}
          <div className="bg-gray-50 p-3 rounded-md relative group">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-gray-800 mb-1">Location</h3>
            
            </div>
            <p className="text-sm text-gray-600">
              Latitude: {restaurant.latitude} | Longitude:{" "}
              {restaurant.longitude}
            </p>
          </div>
          </div>

          {/* Discount */}
          <div className="bg-green-50 p-3 rounded-md border-l-4 border-green-500 relative group">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-green-700">Discount/Offer</h3>
              <UpdateDiscountModal restaurant={restaurant} />
            </div>
            <p className="text-green-600">{restaurant.discount}</p>
          </div>

          {/* Keywords */}
          <div className="relative group">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-800">Keywords</h3>
              <UpdateKeywordsModal restaurant={restaurant} />
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
                <div className="flex items-center gap-x-1">
                  <Star className={`w-4 h-4 fill-amber-400 text-amber-400`} />
                  <span className="text-md font-bold text-amber-500">
                    {restaurant?.ratings}
                  </span>
                  <span>({restaurant?.totalReview} reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-gray-50 p-4 rounded-md space-y-3 relative">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-gray-800">
                Booking Information
              </h3>
              <UpdateInformationModal restaurant={restaurant} />
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Payment Required</span>
              <span className="flex items-center">
                {restaurant.paymentRequired ? (
                  <Check className="w-10 h-10 text-green-700 text-lg bg-green-100 border border-green-300 p-2 rounded-full" />
                ) : (
                  <X className="w-10 h-10 text-red-700 text-lg bg-red-100 border border-red-300 p-2 rounded-full" />
                )}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Cancellation Fee</span>
              <span className="font-medium">
                {restaurant?.cancellationPercentage}%
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Booking Fee</span>
              <span className="flex items-center font-medium">
                <DollarSign className="w-4 h-4" />
                {restaurant?.bookingFeePerGuest} per guest
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="border-t pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800 text-lg">Features</h3>
          <UpdateFeaturesModal restaurant={restaurant} />
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {restaurant?.features?.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="w-5 h-5 text-green-500 mr-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyRestaurant;

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MapPin, MapPinned, Loader2 } from "lucide-react";
import UpdateLocationMap from "./UpdateLocationMap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useUpdateRestaurantMutation } from "../../redux/features/restaurant/restaurantApi";

const UpdateLocationForm = ({restaurant}) => {
  const { address: initialAddress, latitude:initialLatitude, longitude:initialLongitude} = restaurant;
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [ updateRestaurant, { isLoading, isSuccess }] = useUpdateRestaurantMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      address: initialAddress,
      latitude: initialLatitude,
      longitude: initialLongitude,
    },
  });

  // Watch the latitude and longitude values
  const latitude = watch("latitude");
  const longitude = watch("longitude");

  // Update map when coordinates change in form
  useEffect(() => {
    if (latitude && longitude) {
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        setSelectedLocation([lat, lng]);
      }
    }
  }, [latitude, longitude]);

  // Handle location selection from map
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setValue("latitude", location[0].toFixed(6));
    setValue("longitude", location[1].toFixed(6));
  };

  const onSubmit = async (data) => {
    updateRestaurant(data)
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <button
        onClick={handleGoBack}
        className="self-start flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition mb-3"
      >
        <FaArrowLeft className="text-lg" />
        <span>Go Back</span>
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="order-2 lg:order-1">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <div className="relative">
                <input
                  {...register("address", { required: "Address is required" })}
                  id="address"
                  type="text"
                  className={`
                  w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none
                  ${
                    errors.address
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-300 focus:ring-blue-200"
                  }
                  `}
                  placeholder="Enter location address"
                />
                <div className="absolute right-3 top-2.5 text-gray-400">
                  <MapPin size={18} />
                </div>
              </div>
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label
                  htmlFor="latitude"
                  className="block text-sm font-medium text-gray-700"
                >
                  Latitude
                </label>
                <input
                  {...register("latitude", {
                    required: "Latitude is required",
                    pattern: {
                      value: /^-?([0-8]?[0-9]|90)(\.[0-9]{1,6})?$/,
                      message: "Invalid latitude format",
                    },
                  })}
                  id="latitude"
                  type="text"
                  className={`
                  w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none
                  ${
                    errors.latitude
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-300 focus:ring-blue-200"
                  }
                  `}
                  placeholder="e.g., 37.7749"
                />
                {errors.latitude && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.latitude.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="longitude"
                  className="block text-sm font-medium text-gray-700"
                >
                  Longitude
                </label>
                <input
                  {...register("longitude", {
                    required: "Longitude is required",
                    pattern: {
                      value: /^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,6})?$/,
                      message: "Invalid longitude format",
                    },
                  })}
                  id="longitude"
                  type="text"
                  className={`
                  w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none
                  ${
                    errors.longitude
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-300 focus:ring-blue-200"
                  }
                  `}
                  placeholder="e.g., -122.4194"
                />
                {errors.longitude && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.longitude.message}
                  </p>
                )}
              </div>
            </div>

          

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`
                w-full px-4 py-2 text-white font-medium rounded-lg 
                transition-all duration-300 flex items-center justify-center
                ${
                  isSuccess
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-rose-500 hover:bg-rose-600"
                }
                `}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" />
                    Processing...
                  </>
                ) : isSuccess ? (
                  <>
                    <MapPinned size={18} className="mr-2" />
                    Location Saved!
                  </>
                ) : (
                  "Save Location"
                )}
              </button>
            </div>
          </form>

          {selectedLocation && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100 animate-fadeIn">
              <h3 className="text-sm font-semibold text-blue-700 flex items-center">
                <MapPinned size={16} className="mr-1" />
                Selected Location
              </h3>
              <div className="mt-2 text-sm text-blue-800">
                <p>Latitude: {selectedLocation[0].toFixed(6)}</p>
                <p>Longitude: {selectedLocation[1].toFixed(6)}</p>
              </div>
            </div>
          )}
        </div>

        <div className="order-1 lg:order-2 h-[350px] lg:h-[500px]">
          <UpdateLocationMap
            onLocationSelect={handleLocationSelect}
            selectedLocation={selectedLocation}
          />
        </div>
      </div>
    </>
  );
};

export default UpdateLocationForm;

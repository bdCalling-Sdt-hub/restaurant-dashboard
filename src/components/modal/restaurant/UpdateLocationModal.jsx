import { Input, Modal, Form } from "antd";
import { useEffect, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { useUpdateRestaurantMutation } from "../../../redux/features/restaurant/restaurantApi";

import { SquarePen } from "lucide-react";
import { useForm } from "react-hook-form";
import { MapPin, MapPinned, Loader2 } from 'lucide-react';
import RestaurantLocationMap from "../../form/RestaurantLocationMap";


const UpdateLocationModal = ({ restaurant }) => {
   const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    
    const { 
      register, 
      handleSubmit, 
      setValue, 
      formState: { errors },
      watch
    } = useForm({
      defaultValues: {
        address: '',
        latitude: '',
        longitude: '',
        notes: ''
      }
    });
  
    // Watch the latitude and longitude values
    const latitude = watch('latitude');
    const longitude = watch('longitude');
  
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
      setValue('latitude', location[0].toFixed(6));
      setValue('longitude', location[1].toFixed(6));
    };
  
    const onSubmit = async (data) => {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', data);
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Reset the submitted state after showing success message
      setTimeout(() => setSubmitted(false), 3000);
    };
  const [modalOpen, setModalOpen] = useState(false);
  const [updateRestaurant, { isLoading, isSuccess }] =
    useUpdateRestaurantMutation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
    }
  }, [isSuccess, form]);

  const onFinish = (values) => {
    updateRestaurant(values);
  };



  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Edit restaurant name"
      >
        <SquarePen className="w-5 h-5" />
      </button>
      <Modal
        title={<span className="font-bold">Update Location</span>}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          form.setFieldsValue({
            longitude: restaurant?.longitude,
            latitude: restaurant?.latitude,
          });
        }}
        maskClosable={false}
        footer={false}
        width={800}
        height={900}
      >
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="order-2 lg:order-1">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <div className="relative">
              <input
                {...register('address', { required: 'Address is required' })}
                id="address"
                type="text"
                className={`
                  w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none
                  ${errors.address ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}
                `}
                placeholder="Enter location address"
              />
              <div className="absolute right-3 top-2.5 text-gray-400">
                <MapPin size={18} />
              </div>
            </div>
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
                Latitude
              </label>
              <input
                {...register('latitude', { 
                  required: 'Latitude is required',
                  pattern: {
                    value: /^-?([0-8]?[0-9]|90)(\.[0-9]{1,6})?$/,
                    message: 'Invalid latitude format'
                  }
                })}
                id="latitude"
                type="text"
                className={`
                  w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none
                  ${errors.latitude ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}
                `}
                placeholder="e.g., 37.7749"
              />
              {errors.latitude && (
                <p className="text-red-500 text-xs mt-1">{errors.latitude.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
                Longitude
              </label>
              <input
                {...register('longitude', { 
                  required: 'Longitude is required',
                  pattern: {
                    value: /^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,6})?$/,
                    message: 'Invalid longitude format'
                  }
                })}
                id="longitude"
                type="text"
                className={`
                  w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none
                  ${errors.longitude ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}
                `}
                placeholder="e.g., -122.4194"
              />
              {errors.longitude && (
                <p className="text-red-500 text-xs mt-1">{errors.longitude.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Notes (Optional)
            </label>
            <textarea
              {...register('notes')}
              id="notes"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none"
              placeholder="Add any additional details about this location"
            ></textarea>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                w-full px-4 py-2 text-white font-medium rounded-lg 
                transition-all duration-300 flex items-center justify-center
                ${isSubmitting || submitted 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-blue-500 hover:bg-blue-600'}
              `}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" />
                  Saving...
                </>
              ) : submitted ? (
                <>
                  <MapPinned size={18} className="mr-2" />
                  Location Saved!
                </>
              ) : (
                'Save Location'
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
        <RestaurantLocationMap onLocationSelect={handleLocationSelect} selectedLocation={selectedLocation} />
      </div>
    </div>
        {/* <Form
          form={form}
          name="address"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            longitude: restaurant?.longitude,
            latitude: restaurant?.latitude,
          }}
        >
          <Form.Item
            label={
              <span className="font-semibold">
                <span className="text-red-500 mr-1">*</span>
                Latitude
              </span>
            }
            name="latitude"
            rules={[
              { required: true, message: "Latitude is required." },
              {
                type: "number",
                min: -90,
                max: 90,
                message: "Latitude must be between -90 and 90.",
                transform: (value) => Number(value), // Ensures string input is converted
              },
            ]}
          >
            <Input
              type="number"
              step="any"
              placeholder="e.g. 25.7494"
              className="w-full p-2 border rounded"
            />
          </Form.Item>
          <Form.Item
            label={
              <span className="font-semibold">
                <span className="text-red-500 mr-1">*</span>
                Longitude
              </span>
            }
            name="longitude"
            rules={[
              { required: true, message: "Longitude is required." },
              {
                type: "number",
                min: -180,
                max: 180,
                message: "Longitude must be between -180 and 180.",
                transform: (value) => Number(value), // Converts string to number for validation
              },
            ]}
          >
            <Input
              type="number"
              step="any"
              placeholder="e.g. 89.2611"
              className="w-full p-2 border rounded"
            />
          </Form.Item>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-500 hover:bg-red-600 duration-200 p-2 border-0 rounded-md text-white flex justify-center items-center gap-x-2 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <CgSpinnerTwo className="animate-spin" fontSize={16} />
                Processing...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </Form> */}
      </Modal>
    </>
  );
};

export default UpdateLocationModal;

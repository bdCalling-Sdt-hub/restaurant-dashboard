import { useRef, useState } from "react";
import { Form, Input } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { useCreateRestaurantMutation } from "../../redux/features/restaurant/restaurantApi";
import { CgSpinnerTwo } from "react-icons/cg";

const CreateRestaurantForm = () => {
  const [enabled, setEnabled] = useState(false);
  const [discountEnabled, setDisacountEnabled] = useState(false);
  const fileInputRef = useRef(null);
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const [createRestaurant, { isLoading }] = useCreateRestaurantMutation();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    setFile(file);
  };

  const handleClear = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const onFinish = (values) => {
    const finalValues = {
      ...values,
      paymentRequired: enabled,
      keywords: values.keywords
        ? values.keywords?.split(",").map((s) => s.trim())
        : [],
      features: values.features
        ? values.features?.split(",").map((s) => s.trim())
        : [],
    };

    const formData = new FormData();

    // Object.entries(finalValues).forEach(([key, value]) => {
    //   formData.append(key, value instanceof File ? value : value.toString());
    // });

    const {
      name,
      file,
      keywords,
      features,
      address,
      latitude,
      longitude,
      paymentRequired,
      cancellationPercentage,
      bookingFeePerGuest,
      discount,
    } = finalValues;
    formData.append("name", name);
    formData.append("file", file);
    formData.append("address", address);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("paymentRequired", paymentRequired);
    formData.append("cancellationPercentage", cancellationPercentage);
    formData.append("bookingFeePerGuest", bookingFeePerGuest);
    formData.append("discount", discount);

    // formData.append('tags', 'react');
    // formData.append('tags', 'node');
    // formData.append('tags', 'zod');

    //for array valu
    keywords.forEach((keyword) => formData.append("keywords", keyword));
    features.forEach((feature) => formData.append("features", feature));

    // const formObject = Object.fromEntries(formData.entries());
    // console.log(formObject);

    createRestaurant(formData);
  };

  return (
    <div className="bg-gray-50">
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          cancellationCharge: 0,
          bookingFeePerGuest: 0,
          discount: "",
        }}
        onFinish={onFinish}
      >
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow space-y-6">
          <h2 className="text-2xl font-bold text-center">
            Create a Restaurant
          </h2>
          <div>
            <Form.Item
              name="name"
              label={
                <span className="font-semibold">
                  <span className="text-red-500 mr-1">*</span>
                  Restaurant Name
                </span>
              }
              rules={[
                { required: true, message: "Restaurant Name is required" },
              ]}
            >
              <Input
                placeholder="Enter name"
                className="w-full p-2 border rounded"
              />
            </Form.Item>
          </div>
          {/* Image Upload */}
          <div>
            <Form.Item
              name="file"
              label={
                <span className="font-semibold">
                  <span className="text-red-500 mr-1">*</span>
                  Image
                </span>
              }
              valuePropName="file"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e?.target?.files?.[0]; // <-- this gives you the File object
              }}
              rules={[
                {
                  validator: (_, value) => {
                    if (!file) {
                      return Promise.reject("Image is required");
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <div className="relative w-full">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border rounded bg-gray-50"
                />
                {file && (
                  <button
                    type="button"
                    onClick={() => {
                      handleClear();
                      form.setFieldsValue({ file: null });
                      form.validateFields(["file"]);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500"
                  >
                    <AiOutlineClose size={18} />
                  </button>
                )}
              </div>
              {file && (
                <p className="text-sm text-green-600 mt-1">
                  Selected: {file.name}
                </p>
              )}
            </Form.Item>
          </div>

          {/* Keywords */}

          <div>
            <Form.Item
              label={
                <span className="font-semibold">
                  Keywords (comma-separated, optional)
                </span>
              }
              name="keywords"
              rules={[
                {
                  pattern: /^([\w\s-]+)(,\s*[\w\s-]+)*$/,
                  message: "Please enter valid comma-separated keywords.",
                },
              ]}
            >
              <Input
                placeholder="e.g. plant-based, organic"
                className="w-full p-2 border rounded"
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label={
                <span className="font-semibold">
                  Features (comma-separated, optional)
                </span>
              }
              name="features"
              rules={[
                {
                  pattern: /^([\w\s-]+)(,\s*[\w\s-]+)*$/,
                  message: "Please enter valid comma-separated keywords.",
                },
              ]}
            >
              <Input
                placeholder="e.g. plant-based, organic"
                className="w-full p-2 border rounded"
              />
            </Form.Item>
          </div>

          <div>
            <Form.Item
              name="address"
              label={
                <span className="font-semibold">
                  <span className="text-red-500 mr-1">*</span>
                  Address
                </span>
              }
              rules={[
                { required: true, message: "Restaurant Address is required" },
              ]}
            >
              <Input
                placeholder="Enter address"
                className="w-full p-2 border rounded"
              />
            </Form.Item>
          </div>

          {/* Latitude and Longitude */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
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
            </div>
            <div>
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
            </div>
          </div>

          {/* Cancellation Charge */}
          <div className="flex items-center gap-4">
            <div>
              <label className="inline-flex items-center cursor-pointer">
                <span className="mr-2 font-semibold text-gray-700">
                  Payment Required
                </span>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={() => {
                      setEnabled(!enabled);
                    }}
                    className="sr-only"
                  />
                  <div
                    className={`w-11 h-6 rounded-full ${
                      enabled ? "bg-blue-600" : "bg-gray-300"
                    } transition-colors`}
                  ></div>
                  <div
                    className={`dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      enabled ? "translate-x-5" : ""
                    }`}
                  ></div>
                </div>
              </label>
            </div>
            <div className="flex-1">
              <Form.Item
                label={
                  <span className="font-semibold">
                    Booking Fee Per Guest (Optional)
                  </span>
                }
                name="bookingFeePerGuest"
                rules={[
                  {
                    type: "number",
                    min: enabled ? 1 : 0,
                    message: enabled
                      ? "Booking Fee must be atleast 1"
                      : "Booking cannot be negative.",
                    transform: (value) => {
                      if (value === undefined) {
                        return 0;
                      }
                      return Number(value);
                    },
                  },
                ]}
              >
                <Input
                  disabled={!enabled}
                  type="number"
                  min={0}
                  step="any"
                  placeholder="e.g. 5"
                  className="w-full p-2 border rounded"
                />
              </Form.Item>
            </div>

            <div className="flex-1">
              <Form.Item
                label={
                  <span className="font-semibold">
                    Cancellation Charge (%, Optional)
                  </span>
                }
                name="cancellationPercentage"
                rules={[
                  {
                    type: "number",
                    min: 0,
                    message: "Cancellation charge cannot be negative.",
                    transform: (value) => {
                      if (value === undefined) {
                        return 0;
                      }
                      return Number(value);
                    },
                  },
                ]}
              >
                <Input
                  disabled={!enabled}
                  type="number"
                  min={0}
                  step="any"
                  placeholder="e.g. 5"
                  className="w-full p-2 border rounded"
                />
              </Form.Item>
            </div>
          </div>
          {/* <div>
            <Form.Item
              name="discount"
              label={<span className="font-semibold">Discount(Optional)</span>}
            >
              <Input
                type="text"
                placeholder="Enter discount"
                className="w-full p-2 border rounded"
              />
            </Form.Item>
          </div> */}
          <div>
            <Form.Item
              name="discount"
              label={
                <div className="flex items-center justify-between">
                  <span className="font-semibold mr-2">
                    Discount (Optional)
                  </span>
                  {/* Toggle switch */}
                  <div
                    onClick={() => setDisacountEnabled(!discountEnabled)}
                    className={`relative w-11 h-6 rounded-full cursor-pointer transition-colors ${
                      discountEnabled ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                        discountEnabled ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </div>
                </div>
              }
            >
              <Input
                disabled={!discountEnabled}
                type="text"
                placeholder="Enter discount"
                className="w-full p-2 border rounded"
              />
            </Form.Item>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-500 text-white py-2 rounded flex items-center  justify-center gap-3 hover:bg-red-600 transition"
          >
            {isLoading ? (
              <>
                <CgSpinnerTwo className="animate-spin" fontSize={16} />
                Creating...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default CreateRestaurantForm;

import { useRef, useState } from "react";
import { useGetDiningDropDownQuery } from "../../redux/features/dining/diningApi";
import { Form, Input, Select } from "antd";
import { AiOutlineClose } from "react-icons/ai";

const CreateRestaurantPage = () => {
  const fileInputRef = useRef(null);
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);

  const { data, isLoading: dropDownLoading } =
    useGetDiningDropDownQuery(undefined);
  const dinings = data?.data || [];
  const diningOptions = dinings?.map((dining) => ({
    value: dining?._id,
    label: dining?.name,
  }));

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
      keywords: values.keywords ? values.keywords?.split(',').map((s) => s.trim()) : [],
      features: values.features ? values.features?.split(',').map((s) => s.trim()) : []
    };
    console.log(finalValues);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ cancellationCharge: 0 }}
      onFinish={onFinish}
    >
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow space-y-6">
        <h2 className="text-2xl font-bold text-center">Create a Restaurant</h2>
        <div>
          <Form.Item
            name="name"
            label={
              <span className="font-semibold">
                <span className="text-red-500 mr-1">*</span>
                Restaurant Name
              </span>
            }
            rules={[{ required: true, message: "Restaurant Name is required" }]}
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

        {/* Dining (as IDs) */}
        <div>
          <Form.Item
            name="dining"
            label={
              <span className="font-semibold">
                <span className="text-red-500 mr-1">*</span>
                Dining
              </span>
            }
            rules={[{ required: true, message: "Select at least one dining" }]}
          >
            <Select
              mode="multiple"
              disabled={dropDownLoading}
              placeholder="Please select"
              options={diningOptions}
              className=""
            />
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Form.Item
              label={
                <span className="font-semibold">
                  Cancellation Charge (%, Optional)
                </span>
              }
              name="cancellationCharge"
              rules={[
                {
                  type: "number",
                  min: 0,
                  message: "Cancellation charge cannot be negative.",
                  transform: (value) => Number(value), // converts string input to number
                },
              ]}
            >
              <Input
                type="number"
                min={0}
                step="any"
                placeholder="e.g. 5"
                className="w-full p-2 border rounded"
              />
            </Form.Item>
          </div>
          <div>
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
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </div>
    </Form>
  );
};

export default CreateRestaurantPage;

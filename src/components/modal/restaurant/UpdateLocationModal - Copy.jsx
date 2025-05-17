import { Input, Modal, Form } from "antd";
import { useEffect, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { useUpdateRestaurantMutation } from "../../../redux/features/restaurant/restaurantApi";

import { SquarePen } from "lucide-react";

const UpdateLocationModal = ({ restaurant }) => {
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
      >
        <Form
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
        </Form>
      </Modal>
    </>
  );
};

export default UpdateLocationModal;

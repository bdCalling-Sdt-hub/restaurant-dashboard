import { Input, Modal, Form } from "antd";
import { useEffect, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { useUpdateRestaurantMutation } from "../../../redux/features/restaurant/restaurantApi";

import { SquarePen } from "lucide-react";

const UpdateAddressModal = ({ restaurant }) => {
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
        title={<span className="font-bold">Update Address</span>}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          form.setFieldsValue({
            address: restaurant?.address,
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
          initialValues={{ address: restaurant?.address }}
        >
          <Form.Item
            name="address"
            label={<span className="font-semibold">Address</span>}
            rules={[{ required: true, message: "Address is required" }]}
          >
            <Input placeholder="Type here" />
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
              "Save Change"
            )}
          </button>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateAddressModal;

import { Input, Modal, Form } from "antd";
import { useEffect, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { useUpdateRestaurantMutation } from "../../../redux/features/restaurant/restaurantApi";

import { SquarePen } from "lucide-react";

const UpdateNameModal = ({ restaurant }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [createDining, { isLoading, isSuccess }] = useUpdateRestaurantMutation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
      form.resetFields();
    }
  }, [isSuccess, form]);

  const onFinish = (values) => {
    createDining(values);
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
        title={<span className="font-bold">Update Restaurant Name</span>}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
        footer={false}
      >
        <Form form={form} name="add" layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label={<span className="font-semibold">Name</span>}
            rules={[{ required: true, message: "Name is required" }]}
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
                Creating...
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

export default UpdateNameModal;

import { Input, Modal, Form } from "antd";
import { useEffect, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
const { TextArea } = Input;
import { useUpdateRestaurantMutation } from "../../../redux/features/restaurant/restaurantApi";

import { SquarePen } from "lucide-react";

const UpdateFeaturesModal = ({ restaurant }) => {
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
    updateRestaurant({
      features: values.features
        ? values.features?.split(",").map((s) => s.trim())
        : [],
    });
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
        title={<span className="font-bold">Update Features</span>}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          form.setFieldsValue({
            features: restaurant?.features.join(",")
          });
        }}
        maskClosable={false}
        footer={false}
      >
        <Form
          form={form}
          name="features"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            features: restaurant?.features.join(","),
          }}
        >
          <Form.Item
            label={
              <span className="font-semibold">
                Features (comma-separated, optional)
              </span>
            }
            name="features"
            rules={[
              {
                pattern: /^([^,\n]+)(,\s*[^,\n]+)*$/,
                //pattern: /^([\w\s&-]+)(,\s*[\w\s&-]+)*$/,
                message: "Please enter valid comma-separated keywords.",
              },
            ]}
          >
            <TextArea
              placeholder="e.g. plant-based, organic"
              className="w-full p-2 border rounded"
              autoSize={{ minRows: 3, maxRows: 5 }}
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
              "Save Change"
            )}
          </button>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateFeaturesModal;

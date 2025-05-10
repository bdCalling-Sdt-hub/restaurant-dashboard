import { Input, Modal, Form } from "antd";
import { useEffect, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { useUpdateRestaurantMutation } from "../../../redux/features/restaurant/restaurantApi";

import { SquarePen } from "lucide-react";

const UpdateInformationModal = ({ restaurant }) => {
  const [enabled, setEnabled] = useState(restaurant?.paymentRequired);
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
    console.log(values);
    updateRestaurant({
      paymentRequired: enabled,
      bookingFeePerGuest: Number(values.bookingFeePerGuest),
      cancellationPercentage: Number(values.cancellationPercentage)
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
        title={
          <h1 className="font-bold text-center">Update Booking Information</h1>
        }
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          form.setFieldsValue({
            cancellationPercentage: restaurant?.cancellationPercentage,
            bookingFeePerGuest: restaurant?.bookingFeePerGuest,
          });
        }}
        maskClosable={false}
        footer={false}
        size="smaill"
      >
        <Form
          form={form}
          name="address"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            cancellationPercentage: restaurant?.cancellationPercentage,
            bookingFeePerGuest: restaurant?.bookingFeePerGuest,
          }}
        >
          <div className="flex flex-col gap-4 p-2 shadow-sm bg-white mt-2">
            <div>
              <label className="flex justify-between items-center cursor-pointer">
                <span className="mr-2 font-semibold">Payment Required</span>
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
                dependencies={[enabled]}
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
                  className="w-full p-2 border rounded"
                />
              </Form.Item>
            </div>
          </div>
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

export default UpdateInformationModal;

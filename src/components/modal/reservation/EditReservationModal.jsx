import { Modal, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { Edit } from "lucide-react";
import { useUpdateReservationMutation } from "../../../redux/features/reservation/reservationApi";

const EditReservationModal = ({ reservation }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [updateReservation, { isLoading, isSuccess }] = useUpdateReservationMutation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
    }
  }, [isSuccess, form]);

  const onFinish = (values) => {
    updateReservation({
      id: reservation?._id,
      data: {
        seats: Number(values.seats),
      },
    });
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-500 transition-colors"
        aria-label="Edit schedule"
      >
        <Edit className="h-4 w-4" />
      </button>

      <Modal
        title={<span className="font-bold text-xl">Update Booking Schedule</span>}
        open={modalOpen}
        onCancel={() => {
          form.setFieldsValue({
            seats: reservation?.seats,
          });
          setModalOpen(false);
        }}
        maskClosable={false}
        footer={false}
      >
        <Form
          form={form}
          name="edit"
          layout="vertical"
          initialValues={{ seats: reservation?.seats }}
          onFinish={onFinish}
        >
          <Form.Item
            name="seats"
            label={
              <span className="font-semibold">
                <span className="text-red-500 mr-1">*</span>
                Seats
              </span>
            }
            rules={[
              { required: true, message: "Please enter the Total Seats" },
              {
                pattern: /^\d+$/,
                message: "Only numeric values are allowed",
              },
              {
                validator: (_, value) => {
                  if (value && Number(value) <= 0) {
                    return Promise.reject("Price must be greater than 0");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input
              type="number"
              placeholder="Type here"
              onKeyUp={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </Form.Item>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-red-500 hover:bg-red-600 duration-200 p-2 border-0 rounded-md text-white flex justify-center items-center gap-x-2 disabled:cursor-not-allowed"
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

export default EditReservationModal;

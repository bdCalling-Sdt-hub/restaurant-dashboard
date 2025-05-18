import { Modal, Form, Select, Input } from "antd";
import { useEffect, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { useGetScheduleDropDownQuery } from "../../../redux/features/schedule/scheduleApi";
import makeScheduleOptions from "../../../utils/makeScheduleOptions";
import { useSelector } from "react-redux";
import { useCreateReservationMutation } from "../../../redux/features/reservation/reservationApi";
import { useParams } from "react-router-dom";
import { Plus } from "lucide-react";

const AddReservationModal = () => {
  const { date } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const { scheduleOptions } = useSelector((state) => state.schedule);
  const [createReservation, { isLoading, isSuccess }] =
    useCreateReservationMutation();
  const { data } = useGetScheduleDropDownQuery(
    [{ name: "date", value: date }],
    {
      skip: !date,
    }
  );

  useEffect(() => {
    if (data?.data) {
      const schedules = data?.data || [];
      makeScheduleOptions(schedules);
    }
  }, [data]);

  const [form] = Form.useForm();

  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
      form.resetFields();
    }
  }, [isSuccess, form]);

  const onFinish = (values) => {
    console.log(values);
    createReservation({
      scheduleIds: values.scheduleIds,
      seats: Number(values.seats),
    });
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-rose-600 text-white px-4 py-2 rounded-md flex items-center shadow-sm hover:bg-rose-700 transition-colors"
        aria-label="Add new schedule"
      >
        <Plus className="h-5 w-5 mr-2" />
        <span> Add New</span>
      </button>
      <Modal
        title={
          <span className="font-bold text-xl">
            Add New Reservation Calendar
          </span>
        }
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
        footer={false}
        width={680}
      >
        <Form form={form} name="add" layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="scheduleIds"
            dependencies={["date"]}
            rules={[{ required: true, message: "Please select a schedule" }]}
            label={
              <span className="font-semibold">
                <span className="text-red-500 mr-1">*</span>
                Schedule (multiple)
              </span>
            }
          >
            <Select
              mode="multiple"
              placeholder="Select schedule"
              disabled={scheduleOptions.length === 0}
              style={{ width: "100%" }}
              options={scheduleOptions}
            />
            {/* <Select
                          mode="multiple"
                          disabled={dropDownLoading}
                          placeholder="Please select"
                          style={{ width: "100%" }}
                          options={slotOptions}
                        /> */}
          </Form.Item>
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
                Creating...
              </>
            ) : (
              "Add"
            )}
          </button>
        </Form>
      </Modal>
    </>
  );
};

export default AddReservationModal;

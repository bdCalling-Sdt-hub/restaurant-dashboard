import { Modal, Form, Button, DatePicker, Select, Input } from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { CgSpinnerTwo } from "react-icons/cg";
import { useCreateScheduleMutation } from "../../../redux/features/schedule/scheduleApi";
import { useGetSlotDropDownQuery } from "../../../redux/features/slot/slotApi";
import convertUTCtimeString from "../../../utils/convertUTCtimeString";

const CreateTableModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [createSchedule, { isLoading, isSuccess }] =
    useCreateScheduleMutation();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [form] = Form.useForm();
  const { data, isLoading: dropDownLoading } =
    useGetSlotDropDownQuery(undefined);
  const slots = data?.data;
  const slotOptions = slots?.map((slot) => ({
    value: slot?.startTime + "-" + slot?.endTime,
    label: (
      convertUTCtimeString(slot?.startDateTime) +
      "-" +
      convertUTCtimeString(slot.endDateTime)
    ).toString(),
  }));

  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
      form.resetFields();
    }
  }, [isSuccess, form]);

  const onFinish = (values) => {
    const selectedSlots = values?.slot?.map((val) => {
      const [startTime, endTime] = val.split("-");
      return { startTime, endTime };
    });

    const data = {
      startDate,
      endDate,
      slot: selectedSlots,
      availableSeats: Number(values.availableSeats),
    };

    createSchedule(data);
  };

  return (
    <>
      <Button
        className="mb-4 !bg-red-500 !text-white  hover:bg-red-700"
        icon={<PlusOutlined />}
        onClick={() => setModalOpen(true)}
      >
        Add Table
      </Button>
      <Modal
        title={<span className="font-bold text-xl">Add New Table</span>}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
        footer={false}
      >
        <Form form={form} name="add" layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="startDate"
            label={
              <span className="font-semibold">
                <span className="text-red-500 mr-1">*</span>
                Select Date
              </span>
            }
            dependencies={["endDate"]}
            rules={[
              { required: true, message: "Start Date is required" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const endDateValue = getFieldValue("endDate");
                  if (!value || !endDateValue) {
                    return Promise.resolve();
                  }
                  if (value.isAfter(endDateValue, "day")) {
                    return Promise.reject(
                      new Error(
                        "Start Date must be the same or before End Date"
                      )
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <DatePicker
              disabledDate={(current) =>
                current && current < new Date().setHours(0, 0, 0, 0)
              }
              onChange={(_, dateString) => {
                setStartDate(dateString);
              }}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="status"
            label={
              <span className="font-semibold">
                <span className="text-red-500 mr-1">*</span>
                Schedule
              </span>
            }
          >
            <Select
              style={{ width: "100%" }}
              options={[
                { value: "blocked", label: "Blocked" },
                { value: "unblocked", label: "Unblocked" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="status"
            label={
              <span className="font-semibold">
                <span className="text-red-500 mr-1">*</span>
                Dining
              </span>
            }
          >
            <Select
              style={{ width: "100%" }}
              options={[
                { value: "blocked", label: "Blocked" },
                { value: "unblocked", label: "Unblocked" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="availableSeats"
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

export default CreateTableModal;

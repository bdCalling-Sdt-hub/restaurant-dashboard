import { Modal, Form, Button, Checkbox, TimePicker, DatePicker, Select, Input } from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { CgSpinnerTwo } from "react-icons/cg";
import { useCreateScheduleMutation } from "../../../redux/features/schedule/scheduleApi";
import { useGetSlotDropDownQuery } from "../../../redux/features/slot/slotApi";
import convertUTCtimeString from "../../../utils/convertUTCtimeString";


const CreateScheduleModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [createSchedule, { isLoading, isSuccess }] = useCreateScheduleMutation();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [form] = Form.useForm();
  const {data, isLoading:dropDownLoading} = useGetSlotDropDownQuery(undefined);
  const slots = data?.data;
  const slotOptions = slots?.map((slot)=> ({
    value: slot?.startTime+ "-"+slot?.endTime,
    label: (convertUTCtimeString(slot?.startDateTime) +"-"+ convertUTCtimeString(slot.endDateTime)).toString()
  }));


  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
      form.resetFields();
    }
  }, [isSuccess, form]);

  const onFinish = (values) => {
    const selectedSlots = values?.slot?.map(val => {
      const [startTime, endTime] = val.split("-");
      return { startTime, endTime };
    });

    const data = {
      startDate,
      endDate,
      slot: selectedSlots,
      availableSeats: Number(values.availableSeats)
    }
    
    createSchedule(data);
  };

  return (
    <>
      <Button
        className="mb-4 !bg-red-500 !text-white  hover:bg-red-700"
        icon={<PlusOutlined />}
        onClick={() => setModalOpen(true)}
      >
        Add Schedule
      </Button>
      <Modal
        title={<span className="font-bold text-xl">Add New Schedule</span>}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
        footer={false}
        width={680}
      >
        <Form form={form} name="add" layout="vertical" onFinish={onFinish}>
          <div className="grid grid-cols-2 gap-3">
            <Form.Item
              name="startDate"
              label={
                <span className="font-semibold">
                  <span className="text-red-500 mr-1">*</span>
                  Start Date
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
              name="endDate"
              label={
                <span className="font-semibold">
                  <span className="text-red-500 mr-1">*</span>
                  End Date
                </span>
              }
              dependencies={["startDate"]}
              rules={[
                { required: true, message: "End Date is required" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const startDateValue = getFieldValue("startDate");
                    if (!value || !startDateValue) {
                      return Promise.resolve(); // skip if either not selected
                    }
                    if (value.isBefore(startDateValue, "day")) {
                      return Promise.reject(
                        new Error(
                          "End Date must be the same or after Start Date"
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
                  setEndDate(dateString);
                }}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </div>
          <Form.Item
            name="slot"
            label={
              <span className="font-semibold">
                <span className="text-red-500 mr-1">*</span>
                Slots
              </span>
            }
            rules={[{ required: true, message: "Select at least one slot" }]}
          >
            <Select
              mode="multiple"
              disabled={dropDownLoading}
              placeholder="Please select"
              style={{ width: "100%" }}
              options={slotOptions}
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

export default CreateScheduleModal;

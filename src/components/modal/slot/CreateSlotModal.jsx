import { Modal, Form, Button, Checkbox, TimePicker} from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { CgSpinnerTwo } from "react-icons/cg";
import { useCreateSlotMutation } from "../../../redux/features/slot/slotApi";


const CreateSlotModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [createSlot, { isLoading, isSuccess }] = useCreateSlotMutation();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [form] = Form.useForm();
 

  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
      form.resetFields();
    }
  }, [isSuccess, form]);


  const onFinish = () => {
    createSlot({
      startTime,
      endTime,
    });
  };




  return (
    <>
      <Button
        className="!bg-red-500 !text-white  hover:bg-red-700"
        icon={<PlusOutlined />}
        onClick={() => setModalOpen(true)}
      >
        Add Slot
      </Button>
      <Modal
        title={<span className="font-bold text-xl">Add New Slot</span>}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
        footer={false}
      >
        <Form form={form} name="add" layout="vertical" onFinish={onFinish}>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <Form.Item
              name="startTime"
              label={
                <span className="font-semibold">
                  <span className="text-red-500 mr-1">*</span>
                  Start Time
                </span>
              }
              dependencies={['endTime']}
              rules={[
                { required: true, message: "Start Time is required" },
                () => ({
                  validator(_, value) {
                    if (!value || !endTime) {
                      return Promise.resolve(); // Skip validation if one is missing
                    }

                    const [startHour, startMinute] = endTime
                      .split(":")
                      .map(Number);
                    const [endHour, endMinute] = value
                      .format("HH:mm")
                      .split(":")
                      .map(Number);

                    const start = startHour * 60 + startMinute;
                    const end = endHour * 60 + endMinute;

                    if (end >= start) {
                      return Promise.reject(
                        new Error("Start Time must be before End Time")
                      );
                    }

                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <TimePicker
                format="HH:mm"
                style={{ width: "100%" }}
                onChange={(_, timeString) => {
                  setStartTime(timeString);
                }}
              />
            </Form.Item>

            <Form.Item
              name="endTime"
              label={
                <span className="font-semibold">
                  <span className="text-red-500 mr-1">*</span>
                  End Time
                </span>
              }
              dependencies={['startTime']}
              rules={[
                { required: true, message: "End Time is required" },
                () => ({
                  validator(_, value) {
                    if (!value || !startTime) {
                      return Promise.resolve(); // Skip validation if one is missing
                    }

                    const [startHour, startMinute] = startTime
                      .split(":")
                      .map(Number);
                    const [endHour, endMinute] = value
                      .format("HH:mm")
                      .split(":")
                      .map(Number);

                    const start = startHour * 60 + startMinute;
                    const end = endHour * 60 + endMinute;

                    if (end <= start) {
                      return Promise.reject(
                        new Error("End Time must be after Start Time")
                      );
                    }

                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <TimePicker
                format="HH:mm"
                style={{ width: "100%" }}
                onChange={(_, timeString) => {
                  setEndTime(timeString);
                }}
              />
            </Form.Item>
          </div>

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

export default CreateSlotModal;

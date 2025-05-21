import { Modal, Form, Select } from "antd";
import { useEffect, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { useCreateScheduleMutation } from "../../../redux/features/schedule/scheduleApi";
import { useGetSlotDropDownQuery } from "../../../redux/features/slot/slotApi";
import convertUTCtimeString from "../../../utils/convertUTCtimeString";
import { Plus } from "lucide-react";
import { useParams } from "react-router-dom";


const AddScheduleModal = () => {
  const { date } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [createSchedule, { isLoading, isSuccess }] = useCreateScheduleMutation();
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
      startDate:date,
      endDate:date,
      slot: selectedSlots,
    }
    
    createSchedule(data);
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
        title={<span className="font-bold text-xl">Add New Schedule</span>}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
        footer={false}
        width={680}
      >
        <Form form={form} name="add" layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="slot"
            label={
              <span className="font-semibold">
                <span className="text-red-500 mr-1">*</span>
                Slots(multiple)
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

export default AddScheduleModal;

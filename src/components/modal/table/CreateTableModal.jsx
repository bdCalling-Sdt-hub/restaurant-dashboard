import { Modal, Form, Button, DatePicker, Select, Input } from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { CgSpinnerTwo } from "react-icons/cg";
import { useGetScheduleDropDownQuery } from "../../../redux/features/schedule/scheduleApi";
import convertUTCtimeString from "../../../utils/convertUTCtimeString";
import { useGetDiningDropDownQuery } from "../../../redux/features/dining/diningApi";
import { useCreateTableMutation } from "../../../redux/features/table/tableApi";
import disabledDate from "../../../utils/disabledDate";
import { useSelector } from "react-redux";

const CreateTableModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [createTable, { isLoading, isSuccess }] = useCreateTableMutation();
  const [date, setDate] = useState("");
  const { data } = useGetScheduleDropDownQuery(
    [{ name: "date", value: date }],
    {
      skip: !date,
    }
  );
 
  const { diningOptions } = useSelector((state)=>state.dining);
  const [scheduleOptions, setScheduleOptions] = useState([]);
  useEffect(() => {
    if (date) {
      const schedules = data?.data || [];
      const Options = schedules?.map((schedule) => ({
        value: schedule?._id,
        label: (
          convertUTCtimeString(schedule?.startDateTime) +
          "-" +
          convertUTCtimeString(schedule.endDateTime)
        ).toString(),
      }));
      setScheduleOptions(Options);
    } else {
      setScheduleOptions([]);
    }
  }, [data, date]);


  const [form] = Form.useForm();

  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
      form.resetFields();
    }
  }, [isSuccess, form]);

  const onFinish = (values) => {
    createTable({
      scheduleId: values.scheduleId,
      diningId: values.diningId,
      totalTable: Number(values.totalTable),
      seats: Number(values.seats)
    });
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
            name="date"
            label={
              <span className="font-semibold">
                <span className="text-red-500 mr-1">*</span>
                Select Date
              </span>
            }
            rules={[{ required: true, message: "Please select a date" }]}
          >
            <DatePicker
              disabledDate={disabledDate}
              onChange={(_, dateString) => {
                setDate(dateString);
              }}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="scheduleId"
            dependencies={["date"]}
            rules={[{ required: true, message: "Please select a schedule" }]}
            label={
              <span className="font-semibold">
                <span className="text-red-500 mr-1">*</span>
                Schedule
              </span>
            }
          >
            <Select
              placeholder="Select a schedule"
              disabled={scheduleOptions.length === 0}
              style={{ width: "100%" }}
              options={scheduleOptions}
            />
          </Form.Item>
          <Form.Item
            name="diningId"
            rules={[{ required: true, message: "Please select a dining" }]}
            label={
              <span className="font-semibold">
                <span className="text-red-500 mr-1">*</span>
                Dining
              </span>
            }
          >
            <Select
              placeholder="Select a dining"
              disabled={diningOptions.length === 0}
              style={{ width: "100%" }}
              options={diningOptions}
            />
          </Form.Item>
          <Form.Item
            name="totalTable"
            label={
              <span className="font-semibold">
                <span className="text-red-500 mr-1">*</span>
                Total Table
              </span>
            }
            rules={[
              { required: true, message: "Please enter the Total Table" },
              {
                pattern: /^\d+$/,
                message: "Only numeric values are allowed",
              },
              {
                validator: (_, value) => {
                  if (value && Number(value) <= 0) {
                    return Promise.reject("Total Table must be greater than 0");
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

export default CreateTableModal;

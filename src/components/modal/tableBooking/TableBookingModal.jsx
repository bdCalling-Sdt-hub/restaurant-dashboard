import { Input, Modal, Form, Select, } from "antd";
import { useEffect, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { useGetCusineDropDownQuery } from "../../../redux/features/cuisine/cuisineApi";
import { useCreateTableBookingMutation } from "../../../redux/features/tableBooking/tableBookingApi";

const TableBookingModal = ({ table, children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [createTableBooking, { isLoading, isSuccess }] = useCreateTableBookingMutation();
  useGetCusineDropDownQuery(undefined);
  const [form] = Form.useForm();
 

  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
      form.resetFields();
    }
  }, [isSuccess, form]);

  const onFinish = (values) => {
    createTableBooking({
      tableId:table?._id,
      token: values.token,
      guest: Number(values.guest),
      availability: values.availability
    })
  };


  

  return (
    <>
      {/* <button onClick={()=>setModalOpen(true)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm disabled:cursor-not-allowed disabled:opacity-50">
       Book
      </button> */}
      <div onClick={()=>table.seats !==0 &&setModalOpen(true)} >
        {children}
      </div>

      <Modal
        title={<span className="font-bold">Book Table</span>}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
        footer={false}
      >
        <Form
          form={form}
          name="add"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ availability: "Waitlist" }}
        >
          <Form.Item
            name="token"
            label={
              <span className="font-semibold">
                <span className="text-red-500 mr-1">*</span>
                Token
              </span>
            }
            rules={[
              { required: true, message: "Token is required" },
              { min: 6, message: "Token must be 6 characters long!" },
              { max: 6, message: "Token must be 6 characters long!" },
              {
                pattern: /^\d+$/,
                message: "Only numeric values are allowed",
              },
            ]}
          >
            <Input placeholder="Enter token" />
          </Form.Item>
          <Form.Item
            name="guest"
            label={
              <span className="font-semibold">
                <span className="text-red-500 mr-1">*</span>
                Guest
              </span>
            }
            rules={[
              { required: true, message: "Guest is required" },
              {
                pattern: /^\d+$/,
                message: "Only numeric value is allowed",
              },
              {
                validator: (_, value) => {
                  const number = Number(value);
                  if (value && (isNaN(number) || number <= 0)) {
                    return Promise.reject("Guest must be greater than 0");
                  }
                  if (number > table?.seats) {
                    return Promise.reject(
                      `There is only ${table?.seats} seats available`
                    );
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
            name="availability"
            label={
              <span className="font-semibold">Availability (Optional)</span>
            }
          >
            <Select
              style={{ width: "100%", cursor: "pointer" }}
              options={[
                {
                  value: "Immediate Seating",
                  label: "Immediate Seating",
                },
                {
                  value: "Waitlist",
                  label: "Waitlist",
                },
              ]}
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
              "Book"
            )}
          </button>
        </Form>
      </Modal>
    </>
  );
};

export default TableBookingModal;

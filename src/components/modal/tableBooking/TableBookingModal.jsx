import { Input, Modal, Form, } from "antd";
import { useEffect, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { useCreateMenuMutation } from "../../../redux/features/menu/menuApi";
import { useGetCusineDropDownQuery } from "../../../redux/features/cuisine/cuisineApi";

const TableBookingModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [createMenu, { isLoading, isSuccess }] = useCreateMenuMutation();
  const { data } = useGetCusineDropDownQuery(undefined);
  const [form] = Form.useForm();
 

  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
      form.resetFields();
    }
  }, [isSuccess, form]);

  const onFinish = (values) => {
     console.log(values);
  };

  

  return (
    <>
      <button onClick={()=>setModalOpen(true)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
        Book
      </button>

      <Modal
        title={<span className="font-bold">Book Table</span>}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
        footer={false}
      >
        <Form form={form} name="add" layout="vertical" onFinish={onFinish}>
        <Form.Item
            name="name"
            label={
              <span className="font-semibold">
                <span className="text-red-500 mr-1">*</span>
                Name
              </span>
            }
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input placeholder="Type here" />
          </Form.Item>
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
                  if (value && Number(value) <= 0) {
                    return Promise.reject("Guest must be greater than 0");
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

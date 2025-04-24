import { Modal, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { useUpdateTableMutation } from "../../../redux/features/table/tableApi";
import { FaEdit } from "react-icons/fa";

const EditTableModal = ({ table }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [updateTable, { isLoading, isSuccess }] = useUpdateTableMutation();
  const [form] = Form.useForm();
 
  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
      form.resetFields();
    }
  }, [isSuccess, form]);

  const onFinish = (values) => {
    updateTable({
      id: table?._id,
      data: {
        seats: Number(values.seats)
      }
    })
  };

  return (
    <>
      <button
        onClick={()=>setModalOpen(true)}
        className="bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 hover:border-blue-300 p-2 rounded-md transition-colors"
        title="Edit"
      >
        <FaEdit size={20} />
      </button>
      <Modal
        title={<span className="font-bold text-xl">Update Table</span>}
        open={modalOpen}
        onCancel={() =>{
          form.setFieldsValue({
            seats: table?.seats 
          })
          setModalOpen(false)
        }}
        maskClosable={false}
        footer={false}
      >
        <Form form={form} name="add" layout="vertical" initialValues={{ seats: table?.seats }} onFinish={onFinish}>
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

export default EditTableModal;

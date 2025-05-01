import { Input, Modal, Form} from "antd";
import { useEffect, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { EditOutlined } from "@ant-design/icons";
import { useUpdateDiningMutation } from "../../../redux/features/dining/diningApi";


const EditDiningModal = ({ dining }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [updateDining, { isLoading, isSuccess }] = useUpdateDiningMutation();
  const [form] = Form.useForm();


  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
    }
  }, [isSuccess, form]);

 
  //update the dining
  const onFinish = (values) => {
    updateDining({
      id: dining._id,
      data: values
    })
  };

  return (
    <>
      <button
        className="bg-red-500 hover:bg-red-700 !text-white font-bold py-2 px-4 rounded"
        onClick={() => setModalOpen(true)}
      >
        <EditOutlined />
      </button>
      <Modal
        title={<span className="font-bold">Update Dining</span>}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          form.setFieldsValue({ 
            name: dining?.name
          });
        }}
        maskClosable={false}
        footer={false}
      >
        <Form form={form} name="edit" layout="vertical" onFinish={onFinish} initialValues={{ name: dining?.name }}>
          <Form.Item
            name="name"
            label={<span className="font-semibold">Name</span>}
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input key={Date.now()} placeholder="Type here"/>
          </Form.Item>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 bg-red-500 hover:bg-red-600 duration-200 p-2 border-0 rounded-md text-white flex justify-center items-center gap-x-2 disabled:cursor-not-allowed"
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

export default EditDiningModal;

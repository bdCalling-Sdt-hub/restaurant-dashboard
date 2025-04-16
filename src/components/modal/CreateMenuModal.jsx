import { Input, Modal, Form, Button, Select} from "antd";
import { useEffect, useRef, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { AiOutlineClose } from "react-icons/ai";
import { useCreateMenuMutation } from "../../redux/features/menu/menuApi";
import { useGetCusineDropDownQuery } from "../../redux/features/cuisine/cuisineApi";

const CreateMenuModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [createMenu, { isLoading, isSuccess }] = useCreateMenuMutation();
  const {data} = useGetCusineDropDownQuery(undefined);
  const fileInputRef = useRef(null);
  const [form] = Form.useForm();
  const cuisines = data?.data;
  const cuisineOptions = cuisines?.map((item)=>({
    label: item?.name,
    value: item?._id
  }))

  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
      form.resetFields();
    }
  }, [isSuccess, form]);

  const onFinish = (values) => {
    const data = {
      cuisineId: values.cuisineId,
      name: values.name,
      price: Number(values.price),
      ingredient: values.ingredient
    };
    const jsonStringData = JSON.stringify(data);
    let formData = new FormData();
    formData.append("file", values.file);
    formData.append("data", jsonStringData)
    // const formObject = Object.fromEntries(formData.entries());
    // console.log(formObject);
    createMenu(formData);
  };

  const handleClear = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Menu</h2>
        <Button
          onClick={() => setModalOpen(true)}
          className="!bg-red-500 !text-white rounded-full px-4 py-2 text-sm"
        >
          + Add New
        </Button>
      </div>
      <Modal
        title={<span className="font-bold">Add New Menu</span>}
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
                Food Name
              </span>
            }
            rules={[{ required: true, message: "Food Name is required" }]}
          >
            <Input placeholder="Type here" />
          </Form.Item>
          <Form.Item
            name="file"
            label={
              <span className="font-semibold">
                <span className="text-red-500 mr-1">*</span>
                Image
              </span>
            }
            valuePropName="file"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e?.target?.files?.[0]; // <-- this gives you the File object
            }}
            rules={[
              {
                validator: (_, value) => {
                  if (!file) {
                    return Promise.reject("Image is required");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <div className="relative w-full">
              <input
                type="file"
                ref={fileInputRef}
                id="image"
                onChange={(e) => {
                  const selectedFile = e.target.files[0];
                  console.log(selectedFile);
                  setFile(selectedFile);
                  form.setFieldsValue({ file: selectedFile }); // sync with form
                }}
                accept="image/*"
                className="w-full px-4 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {file && (
                <button
                  type="button"
                  onClick={() => {
                    handleClear();
                    form.setFieldsValue({ file: null });
                    form.validateFields(['file']); //// This triggers the "Image is required" message // force revalidation of the image field
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500"
                >
                  <AiOutlineClose size={18} />
                </button>
              )}
            </div>
          </Form.Item>

          <Form.Item
            name="cuisineId"
            rules={[{ required: true, message: "Select a cuisine" }]}
            label={
              <span className="font-semibold">
                <span className="text-red-500 mr-1">*</span>
                Cuisne 
              </span>
            }
          >
            <Select
              placeholder="Select a cuisine"
              style={{ width: "100%" }}
              options={cuisineOptions || []}
            />
          </Form.Item>
          <Form.Item
            name="price"
            label={
              <span className="font-semibold">
                <span className="text-red-500 mr-1">*</span>
                Price
              </span>
            }
            rules={[
              { required: true, message: "Price is required" },
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
          <Form.Item
            label={
              <span className="font-semibold">
                <span className="text-red-500 mr-1">*</span>
                Ingredient
              </span>
            }
            name="ingredient"
            rules={[
              { required: true, message: "Ingredient Must be provided!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-500 hover:bg-red-600 duration-200 p-2 border-0 rounded-md text-white flex justify-center items-center gap-x-2 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <CgSpinnerTwo className="animate-spin" fontSize={16} />
                Creating...
              </>
            ) : (
              "Create"
            )}
          </button>
        </Form>
      </Modal>
    </>
  );
};

export default CreateMenuModal;

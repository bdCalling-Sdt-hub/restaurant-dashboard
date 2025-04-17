import { Input, Modal, Form, Select} from "antd";
import { useEffect, useRef, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { useUpdateMenuMutation } from "../../../redux/features/menu/menuApi";
import { useGetCusineDropDownQuery } from "../../../redux/features/cuisine/cuisineApi";
import { FiEdit } from "react-icons/fi";
import placeholder_img from "../../../assets/images/placeholder.jpeg";
import { IoCameraOutline } from "react-icons/io5";
import { MdPhotoCamera } from "react-icons/md";


const EditMenuModal = ({ menu }) => {
  const {_id:menuId, name, cuisineId, image, price, ingredient} = menu || {}
  const [modalOpen, setModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [updateMenu, { isLoading, isSuccess }] = useUpdateMenuMutation();
  const {data} = useGetCusineDropDownQuery(undefined);
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(image || placeholder_img); // Default image
  
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

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
      setFile(file);
    }
  };


  const onFinish = (values) => {
    let formData = new FormData();
    formData.append("name", values.name);
    formData.append("cuisineId", values.cuisineId);
    formData.append("price", Number(values.price));
    formData.append("ingredient", values.ingredient);

    if(file){
        formData.append("file", file);
    }
    // const formObject = Object.fromEntries(formData.entries());
    // console.log(formObject);
     updateMenu({
       id: menuId,
       data: formData,
     });
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-white p-1.5 rounded-full shadow hover:bg-gray-100 transition"
      >
        <FiEdit className="text-blue-600" size={20} />
      </button>
      <Modal
        title={<span className="font-bold text-xl">Update Menu</span>}
        open={modalOpen}
        onCancel={() => {
          setImageSrc(image);
          setFile(null)
          form.setFieldsValue({
            name,
            cuisineId,
            price,
            ingredient,
          });
          setModalOpen(false);
        }}
        maskClosable={false}
        footer={false}
      >
        <Form
          form={form}
          name="add"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            name,
            cuisineId,
            price,
            ingredient,
          }}
        >
          <div className="relative w-24 h-24 mx-auto">
            <img
              src={imageSrc}
              alt="Preview"
              onError={()=>setImageSrc(placeholder_img)}
              className="rounded-full w-24 h-24 border object-cover shadow-sm"
            />
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <div
              onClick={handleIconClick}
              className="absolute bottom-0 right-0 cursor-pointer"
            >
              <div className="bg-red-600 hover:bg-red-700 transition border-2 border-white flex items-center justify-center w-8 h-8 rounded-full shadow-md">
                <MdPhotoCamera size={18} color="#fff" />
              </div>
            </div>
          </div>

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
            name="cuisineId"
            rules={[{ required: true, message: "Select a cuisine" }]}
            label={
              <span className="font-semibold">
                <span className="text-red-500 mr-1">*</span>
                Cuisine
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

export default EditMenuModal;

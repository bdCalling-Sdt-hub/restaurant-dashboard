import { useState, useEffect, useRef } from "react";
import { Form, Input } from "antd";
import { IoCameraOutline } from "react-icons/io5";
import EditProfileLoading from "../Loader/EditProfileLoading";
import { CgSpinnerTwo } from "react-icons/cg";
import profile_placeholder_img from "../../assets/images/profile_placeholder.png";
import { useUpdateProfileMutation } from "../../redux/features/user/userApi";

// eslint-disable-next-line no-unused-vars
const EditProfile = ({ isLoading, user }) => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [updateProfile, { isLoading: updateLoading, isSuccess }] =
    useUpdateProfileMutation();
  const [form] = Form.useForm();
  const [imageSrc, setImageSrc] = useState(user?.profileImg); // Default image
  const fallback = profile_placeholder_img;

  useEffect(() => {
    if (isSuccess) {
      setFile(null);
    }
  }, [isSuccess, form]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
      setFile(file);
    }
  };

  //update profile
  const onFinish = (values) => {
    let formData = new FormData();
    formData.append("fullName", values.fullName);
    formData.append("phone", values.phone)
    formData.append("address", values.address)

    if (file !== null) {
      formData.append("file", file);
    }
    //  const formObject = Object.fromEntries(formData.entries());
    //  console.log(formObject);
    updateProfile(formData);
  };

  if (isLoading) {
    return <EditProfileLoading />;
  } else {
    return (
      <div className="p-6 bg-gray-100 rounded-lg text-center">
        <div className="max-w-[400px] mx-auto">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: "none" }}
            id="upload-button"
          />{" "}
          <div className="relative">
            <img
              src={imageSrc}
              alt="Preview"
              onError={() => setImageSrc(fallback)}
              className="rounded-full mx-auto w-24 h-24 border"
            />
            <div onClick={()=> fileInputRef.current.click()} className="absolute right-36 bottom-0 cursor-pointer">
              <div className="bg-red-500 border-2 border-white flex items-center justify-center  w-8 h-8 rounded-full ">
                <IoCameraOutline size={20} color="#fff" />
              </div>
            </div>
          </div>
          <h2 className="text-xl font-bold mt-2">Edit Profile</h2>
          <Form
            form={form}
            name="edit"
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              fullName: user?.fullName,
              email: user?.email,
              phone: user?.phone,
              address: user?.address,
            }}
            className="text-left"
          >
            <Form.Item
              label={
                <span className="text-black font-semibold">Full Name</span>
              }
              name="fullName"
              rules={[
                { required: true, message: "Please enter your Full Name" },
              ]}
            >
              <Input
                placeholder="Enter your full name"
                className="rounded-md px-2 py-1 "
              />
            </Form.Item>
            <Form.Item
              name="email"
              label={<span className="text-black font-semibold">Email</span>}
            >
              <Input
                placeholder="Enter Password"
                className="rounded-md px-2 py-1"
                disabled
              />
            </Form.Item>
            <Form.Item
              label={
                <span className="text-black font-semibold">Contact Number</span>
              }
              name="phone"
              rules={[
                { required: true, message: "Please enter your contact number" },
              ]}
            >
              <Input
                placeholder="Enter contact number"
                className="rounded-md px-2 py-1 !placeholder:text-gray-500"
              />
            </Form.Item>
            <Form.Item
              label={<span className="text-black font-semibold">Address</span>}
              name="address"
              rules={[{ required: true, message: "Please enter your address" }]}
            >
              <Input
                placeholder="Enter contact number"
                className="rounded-md px-2 py-1 !placeholder:text-gray-500"
              />
            </Form.Item>
            <Form.Item>
              <button
                type="submit"
                disabled={updateLoading}
                className="w-full bg-red-500 hover:bg-red-600 duration-200 p-2 border-0 rounded-md text-white flex justify-center items-center gap-x-2 disabled:cursor-not-allowed"
              >
                {updateLoading ? (
                  <>
                    <CgSpinnerTwo className="animate-spin" fontSize={16} />
                    Processing...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
};

export default EditProfile;

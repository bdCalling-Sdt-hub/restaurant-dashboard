import { Modal, Form} from "antd";
import { useEffect, useRef, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import placeholder_img from "../../../assets/images/placeholder.jpeg";
import { MdPhotoCamera } from "react-icons/md";
import { SquarePen } from "lucide-react";
import { useUpdateRestaurantImgMutation } from "../../../redux/features/restaurant/restaurantApi";


const UpdateImageModal = ({ restaurant }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [file, setFile] = useState(null);
   const [updateRestaurantImg, { isLoading, isSuccess }] =
      useUpdateRestaurantImgMutation();
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(restaurant?.restaurantImg || placeholder_img); // Default image
  
  const [form] = Form.useForm();
 

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


  const onFinish = () => {
    let formData = new FormData();
    if(file){
        formData.append("file", file);
    }
    // const formObject = Object.fromEntries(formData.entries());
    // console.log(formObject);
     updateRestaurantImg(
       formData,
     );
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="absolute top-3 right-3 p-2 bg-white/80 text-gray-700 rounded-full group-hover:opacity-100 transition-opacity shadow-sm hover:bg-white"
        aria-label="Edit restaurant image"
      >
        <SquarePen className="w-5 h-5" />
      </button>

      <Modal
        title={<span className="font-bold text-xl">Update Image</span>}
        open={modalOpen}
        onCancel={() => {
          setImageSrc(restaurant?.restaurantImg);
          setFile(null);
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
        >
          <div className="relative w-full mt-3 p-4">
            <img
              src={imageSrc}
              alt="Preview"
              onError={() => setImageSrc(placeholder_img)}
              className="w-full border h-[200px] object-cover shadow-sm rounded-lg"
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
              className="absolute top-3 right-3 cursor-pointer"
            >
              <div className="bg-rose-600 hover:bg-rose-700 transition border-2 border-white flex items-center justify-center w-10 h-10 rounded-full shadow-md">
                <MdPhotoCamera size={18} color="#fff" />
              </div>
            </div>
          </div>
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

export default UpdateImageModal;

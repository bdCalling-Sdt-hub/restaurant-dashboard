import { Modal, Form } from "antd";
import { useEffect, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { FiEdit } from "react-icons/fi";
import { useChangeAvailibilityMutation, } from "../../../redux/features/tableBooking/tableBookingApi";


const ChangeAvailabilityModal = ({ tableBookingId, availability}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [ changeAvailability, { isLoading, isSuccess }] = useChangeAvailibilityMutation();
  const [form] = Form.useForm();



  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
    }
  }, [isSuccess, form]);


 const handleClick = () => {
    changeAvailability({
      id: tableBookingId,
      data: {
        availability : availability ==="Waitlist" ? "Seating" : "Waitlist"
      }
    })
 }

  return (
    <>
      <button
        className="p-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full"
        onClick={() => {
            setModalOpen(true);
        }}
      >
        <FiEdit size={14} />
      </button>
      <Modal
        title={`Do you really want to change the availability status to "${availability==="Waitlist" ? "Seating": "Waitlist"}"?`}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
        footer={false}
        width={600}
      >
        <div className="flex justify-end px-4 gap-x-3 pt-2">
           <button onClick={()=>setModalOpen(false)} className="bg-black text-white px-4 py-1 rounded-md">No</button>
           <button onClick={handleClick} disabled={isLoading} className="bg-red-500 hover:bg-red-600 duration-500 text-white px-4 py-1 rounded-md disabled:cursor-not-allowed">
           {isLoading ? (
              <>
                <CgSpinnerTwo className="animate-spin" fontSize={16} />
              </>
            ) : (
              "Yes"
            )}
           </button>
        </div>
      </Modal>
    </>
  );
};

export default ChangeAvailabilityModal;

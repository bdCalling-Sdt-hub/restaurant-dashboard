import { Modal, Form} from "antd";
import { useEffect, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { useUpdateBookingStatusMutation } from "../../../redux/features/booking/bookingApi";


const UpdateBookingStatusModal = ({ bookingId }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [ updateStatus, { isLoading, isSuccess }] = useUpdateBookingStatusMutation();
  const [form] = Form.useForm();



  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
    }
  }, [isSuccess, form]);


 const handleClick = () => {
    updateStatus({
      id: bookingId,
      data: {
        status: "waitlist"
      }
    })
 }

  return (
    <>
      <button onClick={()=> setModalOpen(true)} class="bg-rose-600 hover:bg-rose-700 text-white font-medium py-1 px-2 rounded shadow">
        Forward to Waitlist
      </button>
      <Modal
        title={`Are you sure, you want to forward to waitlist?`}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
        footer={false}
        closable={false}
      >
        <div className="flex justify-end px-4 gap-x-3">
          <button
            onClick={() => setModalOpen(false)}
            className="bg-black text-white px-4 py-1 rounded-md"
          >
            No
          </button>
          <button
            onClick={handleClick}
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-600 duration-500 text-white px-4 py-1 rounded-md disabled:cursor-not-allowed"
          >
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

export default UpdateBookingStatusModal;

import { Modal } from "antd";
import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import ViewCardLoading from "../../Loader/ViewCardLoading";
import { useGetTableBookingsByBookingIdQuery } from "../../../redux/features/tableBooking/tableBookingApi";
import ViewCard from "../../card/ViewCard";

const ViewBookingCardModal = ({bookingId}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const {data, isLoading} = useGetTableBookingsByBookingIdQuery(bookingId);
  const bookingData = data?.data;


  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-black hover:bg-primary p-1.5 text-white rounded-md"
      >
        <IoEyeSharp size={18} />
      </button>

      <Modal
        title={<span className="text-2xl">Booking Details{bookingId}</span>}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
        footer={false}
        width={700}
      >
        {isLoading && <ViewCardLoading />}
        {!isLoading && bookingData?.bookingId && <ViewCard data={bookingData}/>}
      </Modal>
    </>
  );
};

export default ViewBookingCardModal;

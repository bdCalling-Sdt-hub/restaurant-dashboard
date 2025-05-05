import { Modal} from "antd";
import { useEffect, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { useCreateTableBookingMutation } from "../../../redux/features/tableBooking/tableBookingApi";
import { useSelector } from "react-redux";
import { ErrorToast } from "../../../helper/ValidationHelper";
import { useNavigate } from "react-router-dom";

const TableBookingModal = ({ table, children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [createTableBooking, { isLoading, isSuccess }] =
    useCreateTableBookingMutation();
  const { booking } = useSelector((state) => state.booking);
  const { time, diningName } = useSelector((state) => state.table);
  const { token, customerName, guest } = booking || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
      navigate("/waitlist")
    }
  }, [isSuccess, navigate]);

  const handleBooking = () => {
    createTableBooking({
      tableId: table?._id,
      bookingId: booking?._id,
    });
  };



  const handleClick = () => {
    if (table.seats === 0) {
      ErrorToast("There is no seats available");
    }

    if (table.seats < guest) {
      ErrorToast(`Seat(s) are insuffiecient for this customer !`);
    }
    if (table.seats !== 0 && table.seats >= guest) {
      setModalOpen(true);
    }
  };

  return (
    <>
      {/* <button onClick={()=>setModalOpen(true)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm disabled:cursor-not-allowed disabled:opacity-50">
       Book
      </button> */}
      <div onClick={handleClick}>{children}</div>

      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
        footer={false}
      >
        <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border">
          <div className="space-y-1 text-gray-700">
            <p>
              <span className="font-medium">Name:</span> {customerName}
            </p>
            <p>
              <span className="font-medium">Token:</span>
              <span className="font-semibold pl-2">{token}</span>
            </p>
            <p>
              <span className="font-medium">Schedule: </span>
              <span className="bg-purple-100 text-purple-700 border border-purple-300 p-0.5 rounded-sm">
                {time}
              </span>
            </p>
            <p>
              <span className="font-medium">Table Name:</span>
              <span className="font-semibold pl-2">{table?.name}</span>
            </p>
            <p>
              <span className="font-medium">Dining:</span> {diningName}
            </p>
            <p>
              <span className="font-medium">Guest:</span> {guest}
            </p>
          </div>
          <div className="mt-6">
            <button
              onClick={handleBooking}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl flex justify-center items-center gap-x-2 hover:bg-blue-700 transition duration-200 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <CgSpinnerTwo className="animate-spin" fontSize={16} />
                  Processing...
                </>
              ) : (
                "Proceed"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TableBookingModal;

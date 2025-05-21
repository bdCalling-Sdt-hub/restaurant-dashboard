import { Modal} from "antd";
import { useEffect, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { useCreateTableBookingMutation } from "../../../redux/features/tableBooking/tableBookingApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetDiningId, SetScheduleId, SetSelectedDate, SetSelectedTable, SetSelectedTableName } from "../../../redux/features/table/tableSlice";

const TableBookingModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [createTableBooking, { isLoading, isSuccess }] =
    useCreateTableBookingMutation();
  const { booking } = useSelector((state) => state.booking);
  const { time, diningName, selectedTable, selectedTableName, tableBookingSeats } = useSelector((state) => state.table);
  const { token, customerName } = booking || {};
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
      dispatch(SetSelectedTable(""))
      dispatch(SetSelectedTableName(""))
      dispatch(SetSelectedDate(""))
      dispatch(SetScheduleId(""))
      dispatch(SetDiningId(""))
      //navigate("/table-booking-list")
    }
  }, [isSuccess, navigate, dispatch]);

  const handleBooking = () => {
    createTableBooking({
      tableId: selectedTable,
      bookingId: booking?._id,
      guest: tableBookingSeats
    });
  };




  return (
    <>
      <button
      onClick={()=>setModalOpen(true)}
        className={`mt-6 w-full py-3 px-4 rounded-md font-medium text-white bg-rose-600 hover:bg-rose-700`}
      >
        Proceed to Reservation
      </button>

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
              <span className="font-medium">Time: </span>
              <span className="bg-purple-100 text-purple-700 border border-purple-300 p-0.5 rounded-md">
                {time}
              </span>
            </p>
            <p>
              <span className="font-medium">Table Name:</span>
              <span className="font-semibold pl-2">{selectedTableName}</span>
            </p>
            <p>
              <span className="font-medium">Dining:</span> {diningName}
            </p>
            <p>
              <span className="font-medium">Seats: </span> {tableBookingSeats}
            </p>
          </div>
          <div className="mt-6">
            <button
              onClick={handleBooking}
              disabled={isLoading}
              className="w-full bg-rose-600 text-white py-2 px-4 rounded-xl flex justify-center items-center gap-x-2 hover:bg-rose-700 transition duration-200 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <CgSpinnerTwo className="animate-spin" fontSize={16} />
                  Processing...
                </>
              ) : (
                "Confirm Reservation"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TableBookingModal;

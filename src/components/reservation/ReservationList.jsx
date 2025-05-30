import { useState } from "react";
import ListLoading from "../Loader/ListLoading";
import CreateReservationModal from "../modal/reservation/CreateReservationModal";
import { DatePicker } from "antd";
import ReservationTable from "./ReservationTable";
import { useGetReservationsQuery } from "../../redux/features/reservation/reservationApi";
import { useDispatch, useSelector } from "react-redux";
import { SetReservationSelectedDate } from "../../redux/features/reservation/reservationSlice";
import dayjs from "dayjs";

const ReservationList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { reservationSelectedDate } = useSelector((state) => state.reservation);
  const dispatch = useDispatch();

  const { data, isLoading } = useGetReservationsQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize },
    { name: "date", value: reservationSelectedDate },
  ]);
  const reservations = data?.data || [];
  const meta = data?.meta;

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg">
          Total: <span className="font-bold"> {meta?.total} </span>
        </h1>
        <div className="flex items-center gap-2 mr-8">
          {/* Filter By Date */}
          <div className="mr-10 px-6 flex gap-x-2">
            <span className="text-xl font-semibold">Filter:</span>
            <DatePicker
              value={
                reservationSelectedDate ? dayjs(reservationSelectedDate) : null
              }
              onChange={(_, dateString) => {
                dispatch(SetReservationSelectedDate(dateString));
              }}
              style={{ width: "100%" }}
            />
          </div>
          <CreateReservationModal />
        </div>
      </div>
      {isLoading ? (
        <ListLoading />
      ) : (
        <ReservationTable
          reservations={reservations}
          meta={meta}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      )}
    </>
  );
};

export default ReservationList;

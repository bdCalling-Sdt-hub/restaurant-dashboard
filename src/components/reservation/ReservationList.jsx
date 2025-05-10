
import { useState } from "react";
import ListLoading from "../Loader/ListLoading";
import CreateTableModal from "../modal/table/CreateTableModal";
import { DatePicker } from "antd";
import ReservationTable from "./ReservationTable";
import { useGetReservationsQuery } from "../../redux/features/reservation/reservationApi";


const ReservationList = () => {
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ pageSize, setPageSize ] = useState(10);
  const [date, setDate] = useState("");


  const { data, isLoading } = useGetReservationsQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize },
  ]);
  const reservations = data?.data || []
  const meta = data?.meta;

 
    

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <CreateTableModal />
        {/* Filter By Date */}
        <div className="mr-20 px-6 flex gap-x-2">
          <span className="text-xl font-semibold">Filter:</span>
          <DatePicker
            onChange={(_, dateString) => {
              console.log(dateString);
              setDate(dateString);
            }}
            style={{ width: "100%" }}
          />
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
}

export default ReservationList;
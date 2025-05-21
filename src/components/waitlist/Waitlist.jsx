
import { DatePicker, Input } from "antd";
import { useEffect, useState } from "react";
import ListLoading from "../Loader/ListLoading";
import { useGetWaitlistQuery } from "../../redux/features/booking/bookingApi";
import WaitlistTable from "./WaitlistTable";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { SetWaitlistSelectedDate } from "../../redux/features/booking/bookingSlice";

const { Search } = Input;

const Waitlist = () => {
  const [searchQuery, setSearchQuery ] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ pageSize, setPageSize ] = useState(10);
   const { waitlistSelectedDate } = useSelector((state) => state.booking);
  const dispatch = useDispatch();

  //debounced handle
  useEffect(() => {
    let timeoutId;
    clearTimeout(timeoutId); //clear timeout after onChange
    timeoutId = setTimeout(() => {
      setSearchTerm(searchQuery);
    }, 600);
  }, [searchQuery]);

  const { data, isLoading } = useGetWaitlistQuery([
    { name: "searchTerm", value: searchTerm },
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize },
    { name: "status", value: "waitlist"},
    { name: "date", value: waitlistSelectedDate}
  ]);
  const bookings = data?.data || []
  const meta = data?.meta;
    
   
  const handleSearch = (value) => {
    setSearchQuery(value);
  };



  return (
    <>
       <div className="flex justify-end items-center mb-4">
        <div className="flex gap-3 items-center">
          <div className="w-[348px]">
          <Search
            placeholder="Search here..."
            onSearch={handleSearch}
            onChange={(e) => handleSearch(e.target.value)}
            className="p-4 rounded"
          />
        </div>
        <div className="w-[250px] flex justify-center mr-20 gap-x-2">
          <h1 className="text-xl font-semibold">Filter:</h1>
          <div>
            <DatePicker
            value={waitlistSelectedDate ? dayjs(waitlistSelectedDate) : null}
            onChange={(_, dateString) => {
              dispatch(SetWaitlistSelectedDate(dateString));
            }}
            style={{ width: "100%" }}
            className="p-2 rounded"
          />
          </div>
        </div>
        </div>
      </div>
      {
        isLoading ? (
          <ListLoading/>
        ): (
          <WaitlistTable bookings={bookings} meta={meta} currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={pageSize} setPageSize={setPageSize}/>
        )
      }
    </>
  );
}

export default Waitlist;
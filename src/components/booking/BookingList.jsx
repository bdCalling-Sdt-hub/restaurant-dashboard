
import { Input } from "antd";
import { useEffect, useState } from "react";
import ListLoading from "../Loader/ListLoading";
import { useGetBookingsQuery } from "../../redux/features/booking/bookingApi";
import BookingTable from "./BookingTable";

const { Search } = Input;

const BookingList = () => {
  const [searchQuery, setSearchQuery ] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ pageSize, setPageSize ] = useState(10);

  //debounced handle
  useEffect(() => {
        let timeoutId;
        clearTimeout(timeoutId); //clear timeout after onChange
        timeoutId = setTimeout(() => {
        setSearchTerm(searchQuery); 
        }, 600);    
  }, [searchQuery]);

  const { data, isLoading } = useGetBookingsQuery([
    { name: "searchTerm", value: searchTerm },
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize }
  ]);
  const users = data?.data || []
  const meta = data?.meta;
    
   
  const handleSearch = (value) => {
    setSearchQuery(value);
  };



  return (
    <>
      <div className="flex justify-end items-center mb-4">
        <div className="w-[348px]">
          <Search
            placeholder="Search here..."
            onSearch={handleSearch}
            onChange={(e) => handleSearch(e.target.value)}
            className="p-2 rounded"
          />
        </div>
      </div>
      {
        isLoading ? (
          <ListLoading/>
        ): (
          <BookingTable users={users} meta={meta} currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={pageSize} setPageSize={setPageSize}/>
        )
      }
    </>
  );
}

export default BookingList;
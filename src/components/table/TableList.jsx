
import { useState } from "react";
import ListLoading from "../Loader/ListLoading";
import TableBoxTable from "./TableBoxTable";
import CreateTableModal from "../modal/table/CreateTableModal";
import { DatePicker } from "antd";
import { useGetTablesQuery } from "../../redux/features/table/tableApi";


const TableList = () => {
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ pageSize, setPageSize ] = useState(10);
  const [date, setDate] = useState("");


  const { data, isLoading } = useGetTablesQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize },
    { name: "date", value: date}
  ]);
  const tables = data?.data || []
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
        <TableBoxTable
          tables={tables}
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

export default TableList;
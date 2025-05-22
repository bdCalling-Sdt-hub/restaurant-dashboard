import { useState } from "react";
import ListLoading from "../Loader/ListLoading";
import TableBoxTable from "./TableBoxTable";
import CreateTableModal from "../modal/table/CreateTableModal";
import { DatePicker } from "antd";
import { useGetTablesQuery } from "../../redux/features/table/tableApi";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { SetTableSelectedDate } from "../../redux/features/table/tableSlice";

const TableList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { tableSelectedDate } = useSelector((state) => state.table);
  const dispatch = useDispatch();

  const { data, isLoading } = useGetTablesQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize },
    { name: "date", value: tableSelectedDate },
  ]);
  const tables = data?.data || [];
  const meta = data?.meta;

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg">
          Total: <span className="font-bold"> {meta?.total} </span>
        </h1>
        <div className="flex items-center gap-2 mr-8">
          {/* Filter By Date */}
          <div className="mr-6 px-6 flex gap-x-2">
            <span className="text-xl font-semibold">Filter:</span>
            <DatePicker
              value={tableSelectedDate ? dayjs(tableSelectedDate) : null}
              onChange={(_, dateString) => {
                dispatch(SetTableSelectedDate(dateString));
              }}
              style={{ width: "100%" }}
            />
          </div>
          <CreateTableModal />
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
};

export default TableList;

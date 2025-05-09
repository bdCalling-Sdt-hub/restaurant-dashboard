import { useDispatch, useSelector } from "react-redux";
import { useGetTablesByScheduleAndDiningQuery } from "../../redux/features/table/tableApi";
import TableLoading from "../Loader/TableLoading";
import { useEffect } from "react";
import { SetTables } from "../../redux/features/table/tableSlice";
import TableListItem from "./TableListItem";
import NotTableFoundCard from "../card/NotTableFoundCard";

const AssignTableList = () => {
  const dispatch = useDispatch();
  const { tables, scheduleId, diningId } = useSelector((state) => state.table);

  const { data, isLoading } = useGetTablesByScheduleAndDiningQuery(
    {
      scheduleId,
      diningId,
    },
    {
      skip: !scheduleId || !diningId,
    }
  );

  useEffect(() => {
    if (data?.data) {
      const Tables = data?.data?.tables;
      dispatch(SetTables(Tables));
    }
  }, [data, dispatch]);

  return (
    <>
      {isLoading ? (
        <TableLoading />
      ) : (
        <>
          {tables?.length > 0 ? (
            <>
                <div className="w-full h-full bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-700">Select a Table</h2>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                  <span>Unavailable</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <span>Selected</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {tables.map((table, index) => (
               <TableListItem key={index} table={table}/>
              ))}
            </div>
          </div>
            </>
          ) : (
            <NotTableFoundCard/>
          )}
        </>
      )}
    </>
  );
};

export default AssignTableList;

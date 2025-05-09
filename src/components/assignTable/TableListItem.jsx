import { useDispatch, useSelector } from "react-redux";
import { SetSelectedTable, SetSelectedTableName } from "../../redux/features/table/tableSlice";

const TableListItem = ({ table }) => {
  const dispatch = useDispatch();
  const { selectedTable } = useSelector((state) => state.table);
  const { booking } = useSelector((state) => state.booking);

  const handleTableSelect = (tableId) => {
    if (selectedTable === tableId) {
      dispatch(SetSelectedTable(""));
    } else {
      dispatch(SetSelectedTable(tableId));
      dispatch(SetSelectedTableName(table?.name))
    }
  };

  const available = table?.seats > 0 && table?.seats >= booking.guest;
 

  return (
    <>
      <div
        onClick={() => available && handleTableSelect(table._id)}
        className={`
                    relative flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all transform hover:scale-105
                    ${
                      available
                        ? "cursor-pointer"
                        : "cursor-not-allowed opacity-60"
                    }
                    ${
                      selectedTable === table._id
                        ? "border-rose-500 bg-rose-50"
                        : available
                        ? "border-green-500 bg-green-50"
                        : "border-gray-300 bg-gray-100"
                    }
                  `}
      >
        <div
          className={`
                    w-16 h-16 flex items-center justify-center transform rotate-45 mb-3
                    ${
                      selectedTable === table._id
                        ? "bg-rose-500"
                        : available
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }
                  `}
        >
          <span className="transform -rotate-45 text-white font-bold">
            {table?.name}
          </span>
        </div>
        {/* <div className="mt-2">
              </div> */}
          <span className="font-medium text-gray-800">{table.seats} Seats</span>
          <span className="text-xs text-gray-500">
            {selectedTable === table._id
              ? "Selected"
              : available
              ? "Available"
              : "Unavailable"}
          </span>
      </div>
    </>
  );
};

export default TableListItem;

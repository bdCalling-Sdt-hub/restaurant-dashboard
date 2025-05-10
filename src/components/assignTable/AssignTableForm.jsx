import { useDispatch, useSelector } from "react-redux";
import {
  SetDiningId,
  SetDiningName,
} from "../../redux/features/table/tableSlice";
import { Check } from "lucide-react";
import TableBookingModal from "../modal/tableBooking/TableBookingModal";

const AssignTableForm = () => {
  const dispatch = useDispatch();
  const {
    selectedDate,
    scheduleId,
    diningId,
    diningName,
    selectedTable,
    selectedTableName,
    time,
  } = useSelector((state) => state.table);
  const { diningOptions } = useSelector((state) => state.dining);
  const { booking } = useSelector((state) => state.booking);


  return (
    <>
      <div className=" bg-white w-[260px] p-4 rounded shadow-sm space-y-4 h-full">
        <div className="border-t pt-4">
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <span className="w-20 font-medium">Date:</span>
              <span className="bg-blue-100 text-blue-800 border border-blue-300 px-3 py-1 rounded-full text-xs font-semibold">
                {selectedDate}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="w-20 font-medium">Time:</span>
              <span className="bg-purple-100 text-purple-800 border border-purple-300 px-3 py-1 rounded-full text-xs font-semibold">
                {/* In door */} {time}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-20 font-medium">Guest:</span>
              <span className="bg-pink-100 text-pink-800 border border-pink-300 px-3 py-1 rounded-full text-xs font-semibold">
                {/* In door */} {booking?.guest}
              </span>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            * Dining
          </label>
          <select
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
            value={diningId}
            onChange={(e) => {
              dispatch(SetDiningId(e.target.value));
              const selectedLabel =
                e.target.options[e.target.selectedIndex].text;
              dispatch(SetDiningName(selectedLabel));
            }}
            disabled={diningOptions.length === 0 || !scheduleId}
          >
            <option value="" disabled>
              Select a dining
            </option>
            {diningOptions?.map((dining, index) => (
              <option key={index} value={dining.value}>
                {dining.label}
              </option>
            ))}
          </select>
        </div>
        {/* Summary Part */}
        {/* {selectedDate && scheduleId && diningId && ( */}
        {/* <div className="border-t pt-4"> */}
        {/* <h3 className="text-sm font-semibold text-gray-700 mb-3"> */}
        {/* Selected Summary */}
        {/* </h3> */}
        {/* <div className="space-y-2 text-sm text-gray-700"> */}
        {/* <div className="flex items-center gap-2"> */}
        {/* <span className="w-20 font-medium">Schedule:</span> */}
        {/* <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold"> */}
        {/* 10:00 AM–11:00 AM {time} */}
        {/* </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-20 font-medium">Dining:</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold"> */}
        {/* In door {diningName} */}
        {/* </span>
              </div>
            </div>
          </div> */}
        {/* )} */}

        {/* Reservation Summary */}
        {selectedTable && scheduleId && diningId && (
          <>
            <div className="mt-6 p-4 bg-rose-50 rounded-lg border border-rose-100">
              <h3 className="font-medium text-rose-800 flex items-center gap-1">
                <Check className="h-4 w-4" /> Reservation Summary
              </h3>
              <div className="mt-2 text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  <span className="bg-blue-100 text-blue-800 border border-blue-300 px-3 py-1 rounded-full text-xs font-semibold">
                    {selectedDate}
                  </span>
                </p>
                <p>
                  <span className="font-medium">Time:</span> {time}
                </p>
                <p>
                  <span className="font-medium">Guest:</span> {booking?.guest}
                </p>
                <p>
                  <span className="font-medium">Dining:</span> {diningName}
                </p>
                <p>
                  <span className="font-medium">Table:</span>{" "}
                  {selectedTableName}
                </p>
              </div>
            </div>
           <TableBookingModal/>
          </>
        )}
      </div>
    </>
  );
};

export default AssignTableForm;

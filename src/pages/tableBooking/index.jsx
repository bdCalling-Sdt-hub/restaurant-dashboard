/* eslint-disable no-unused-vars */
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useGetScheduleDropDownQuery } from "../../redux/features/schedule/scheduleApi";
import { useGetMyDiningsQuery } from "../../redux/features/dining/diningApi";
import {
  SetDiningId,
  SetDiningName,
  SetScheduleId,
  SetSelectedDate,
  SetTime,
} from "../../redux/features/table/tableSlice";

const TableBooking = () => {
  const dispatch = useDispatch();
  const { selectedDate, scheduleId, diningId, time, diningName } = useSelector(
    (state) => state.table
  );
  const { scheduleOptions } = useSelector((state) => state.schedule);
  useGetScheduleDropDownQuery([{ name: "date", value: selectedDate }], {
    skip: !selectedDate,
  });

  const { data: diningData } = useGetMyDiningsQuery();
  const dinings = diningData?.data || [];
  const diningOptions = dinings?.map((dining) => ({
    value: dining?._id,
    label: dining?.name,
  }));

  const tables = [
    { name: "T1", seats: 4 },
    { name: "T2", seats: 6 },
    { name: "T3", seats: 8 },
    { name: "T4", seats: 5 },
    { name: "T5", seats: 6 },
    { name: "T6", seats: 4 },
    { name: "T7", seats: 7 },
    { name: "T8", seats: 6 },
    { name: "T9", seats: 5 },
  ];

  return (
    <>
      <div className="flex  min-h-screen">
        {/* Left Side: Search and Filters */}
        <div className="w-1/4 p-4 border-r border-gray-200">
          <div className=" bg-white w-[260px] p-4 rounded shadow-sm space-y-4">
            {/* Form Part */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                * Select Date
              </label>
              <DatePicker
                value={selectedDate ? dayjs(selectedDate) : null}
                disabledDate={(current) =>
                  current && current < new Date().setHours(0, 0, 0, 0)
                }
                onChange={(_, dateString) => {
                  dispatch(SetSelectedDate(dateString));
                  dispatch(SetScheduleId(""));
                  dispatch(SetDiningId(""));
                }}
                style={{ width: "100%" }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                * Schedule
              </label>
              <select
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                value={scheduleId}
                onChange={(e) => {
                  dispatch(SetScheduleId(e.target.value));
                  const selectedLabel =
                    e.target.options[e.target.selectedIndex].text;
                  dispatch(SetTime(selectedLabel));
                  dispatch(SetDiningId(""));
                }}
                disabled={scheduleOptions.length === 0}
              >
                <option value="" disabled>
                  Select a Schedule
                </option>
                {scheduleOptions?.map((schedule, index) => (
                  <option key={index} value={schedule.value}>
                    {schedule.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
            {selectedDate && scheduleId && diningId && (
              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Selected Summary
                </h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="w-20 font-medium">Date:</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                      {selectedDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-20 font-medium">Schedule:</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                      {/* 10:00 AM–11:00 AM */} {time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-20 font-medium">Dining:</span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold">
                      {/* In door */} {diningName}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Table Layout */}
        <div className="w-3/4 p-4">
          <div>
            <div className="grid !bg-[#ebebeb] rounded-2xl p-16  mt-5 grid-cols-3 gap-20">
              {["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9"].map(
                (table) => (
                  <div className="relative rotate-45 w-32 h-32 cursor-pointer">
                    <div className="absolute top-0 left-0 w-full h-full rounded-4xl border-[15px] border-red-500"></div>

                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-2xl w-24 h-24 flex flex-col items-center justify-center">
                      <span className="text-4xl font-semibold">{table}</span>
                      <span className="text-sm font-semibold">
                        Seats: {"0"}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableBooking;

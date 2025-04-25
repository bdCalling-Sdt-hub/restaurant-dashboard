import { useGetScheduleDropDownQuery } from "../../redux/features/schedule/scheduleApi";
import { useGetMyDiningsQuery } from "../../redux/features/dining/diningApi";
import TableBookingSchedule from "../../components/tableBookingSchedule/TableBookingSchedule";
import { DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SetDiningId, SetDiningName, SetScheduleId, SetSelectedDate, SetTime } from "../../redux/features/table/tableSlice";
import dayjs from "dayjs";

const TableBookingSchedulePage = () => {
  const dispatch = useDispatch();
  const { selectedDate, scheduleId, diningId, time, diningName } = useSelector((state)=> state.table);
  const { scheduleOptions } = useSelector((state)=>state.schedule)
  useGetScheduleDropDownQuery(
    [{ name: "date", value: selectedDate }],
    {
      skip: !selectedDate,
    }
  );

  const { data: diningData } = useGetMyDiningsQuery();
  const dinings = diningData?.data || [];
  const diningOptions = dinings?.map((dining) => ({
    value: dining?._id,
    label: dining?.name,
  }));

  

  return (
    <>
      <section className=" h-full bg-gray-50">
        <div className="flex gap-x-4 p-4 gap-4">
          {/* Left */}
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
                  const selectedLabel = e.target.options[e.target.selectedIndex].text;
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
                onChange={(e) =>{
                   dispatch(SetDiningId(e.target.value));
                   const selectedLabel = e.target.options[e.target.selectedIndex].text;
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
            {
              selectedDate && scheduleId && diningId &&(
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
              )
            }
           
          </div>
          {/* Right */}
          <div className="flex-1">
            <TableBookingSchedule
              selectedDate={selectedDate}
              scheduleId={scheduleId}
              diningId={diningId}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default TableBookingSchedulePage;
